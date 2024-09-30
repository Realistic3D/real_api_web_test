export function saveFileAs(contents, ext = 'r3d') {
  saveAs(contents, 'RealScene', ext);
}

export function saveAs(contents, name = 'RealScene', ext = 'r3d') {
  const blob = new Blob([contents], { type: 'application/octet-stream' });

  // Create a link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  // Set the download attribute to prompt the "Save As" dialog
  // link.download = 'RealScene.r3d';
  link.download = `${name}.${ext}`;

  // Append the link to the body (needed for Firefox)
  document.body.appendChild(link);

  // Simulate a click
  link.click();

  // Clean up
  document.body.removeChild(link);
  setTimeout(() => window.URL.revokeObjectURL(url), 100);
}
