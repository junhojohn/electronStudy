const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

// SET ENV
process.env.MODE_ENV = 'production';

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new Window
    mainWindow = new BrowserWindow();

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));



    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build menu form template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Inster Menu
    Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Base 코드 경로 열기'
            },
            {
                label: 'Update 코드 경로 열기'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]

    }
]

// If mac, add empty object
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in product (that is, dubug mode)
if(process.env.MODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}