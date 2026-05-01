import scannerProvider from '../shared/providers/ScannerProvider.js';

document.getElementById('scanForm').addEventListener('submit', async e => {
    e.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');
    const url = urlInput.value;

    resultDiv.innerText = 'Scanning...';

    try {
        const data = await scannerProvider.scanUrl(url);
        resultDiv.innerText = `Verdict: ${data.verdict} (${data.flagged}/${data.total_engines} engines flagged)`;
    } catch (error) {
        resultDiv.innerText = `Error: ${error}`;
    }
});
