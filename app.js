// URL Generator and Copy Utility for Discord Bot Verification

document.addEventListener('DOMContentLoaded', () => {
  const domainInput = document.getElementById('custom-domain-input');
  const termsInput = document.getElementById('terms-url-input');
  const privacyInput = document.getElementById('privacy-url-input');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Compute current origin / base URL
  function getBaseUrl() {
    if (domainInput && domainInput.value.trim() !== '') {
      let val = domainInput.value.trim();
      if (!val.startsWith('http://') && !val.startsWith('https://')) {
        val = 'https://' + val;
      }
      return val.replace(/\/+$/, '');
    }
    const currentOrigin = window.location.origin;
    // If opened as local file protocol
    if (currentOrigin === 'null' || window.location.protocol === 'file:') {
      return 'https://your-domain.com';
    }
    return currentOrigin;
  }

  // Update URL inputs
  function refreshUrls() {
    const base = getBaseUrl();
    if (termsInput) {
      termsInput.value = `${base}/terms.html`;
    }
    if (privacyInput) {
      privacyInput.value = `${base}/privacy.html`;
    }
  }

  if (domainInput) {
    domainInput.addEventListener('input', refreshUrls);
  }
  refreshUrls();

  // Copy to clipboard helper
  window.copyUrl = function (inputId, btnElement) {
    const targetInput = document.getElementById(inputId);
    if (!targetInput) return;

    navigator.clipboard.writeText(targetInput.value).then(() => {
      const origText = btnElement.innerHTML;
      btnElement.classList.add('copied');
      btnElement.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied
      `;

      showToast('Link copied to clipboard for Discord verification');

      setTimeout(() => {
        btnElement.classList.remove('copied');
        btnElement.innerHTML = origText;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy', err);
    });
  };

  function showToast(msg) {
    if (!toast) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
