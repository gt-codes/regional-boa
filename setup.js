const fs = require('fs');

const regions = [
	'arn1',
	'bom1',
	//'bru1',
	'cdg1',
	'cle1',
	'cpt1',
	'dub1',
	'fra1',
	'gru1',
	'hkg1',
	'hnd1',
	'iad1',
	'icn1',
	'kix1',
	'lhr1',
	'pdx1',
	'sfo1',
	'sin1',
	'syd1',
];

fs.mkdirSync('.vercel/output', { recursive: true });
fs.writeFileSync('.vercel/output/config.json', JSON.stringify({ version: 3 }));

for (let i = 0; i < regions.length; i++) {
	const region = regions[i];
	const folderPath = `.vercel/output/functions/${region}.func`;

	fs.mkdirSync(folderPath, { recursive: true });

	// Create index.js file
	const indexFileContent = `export default function index(request, event) {\n\treturn new Response("Hello from the ${region} - at the Edge!")\n}`;
	fs.writeFileSync(`${folderPath}/index.js`, indexFileContent);

	// Create .vc-config.json file
	const configContent = JSON.stringify({
		runtime: 'edge',
		entrypoint: 'index.js',
		regions: [region],
	});
	fs.writeFileSync(`${folderPath}/.vc-config.json`, configContent);
}
