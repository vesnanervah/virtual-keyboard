export default class Monitor{

    createMonitor(){
        let monitor = document.createElement('div');
        let monitorDisplay = document.createElement('div');
        let displayText = document.createElement('textarea');
        let monitorLogo = document.createElement('div');
        monitor.className = 'dos__monitor';
        monitorDisplay.className = 'monitor__display';
        displayText.className = 'display__text';
        displayText.setAttribute('placeholder', '...')
        monitorLogo.className = 'monitor__logo';
        monitorLogo.textContent = 'DOS';
        monitor.append(monitorDisplay);
        monitor.append(monitorLogo);
        monitorDisplay.append(displayText);
        return monitor;
    }   
}