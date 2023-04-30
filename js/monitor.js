export default class Monitor {
  createMonitor() {
    const monitor = document.createElement('div');
    const monitorDisplay = document.createElement('div');
    const displayText = document.createElement('textarea');
    const monitorLogo = document.createElement('div');
    monitor.className = 'dos__monitor';
    monitorDisplay.className = 'monitor__display';
    displayText.className = 'display__text';
    displayText.setAttribute('placeholder', '...');
    monitorLogo.className = 'monitor__logo';
    monitorLogo.textContent = 'DOS';
    monitor.append(monitorDisplay);
    monitor.append(monitorLogo);
    monitorDisplay.append(displayText);
    return monitor;
  }
}
