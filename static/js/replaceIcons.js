window.onload = function() {
  document.querySelectorAll('.cardTitle_rnsV').forEach((element) => {
    // Use a regular expression to match and replace the icon
    element.innerHTML = element.innerHTML.replace(/📄️\s*<!--.*?-->\s*/, '📜 ');
  });
};
