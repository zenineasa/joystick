/* Copyright (c) 2024 Zenin Easa Panthakkalakath */


import qrcode from 'qrcode';
import ExpressServer from './modules/ExpressServer.mjs';

// Start the express server
ExpressServer.start();

// Wait for the DOM elements to be available
window.addEventListener('DOMContentLoaded', () => {
    // Callback for maximize button
    let isMaximized = true;
    document.getElementById('maximize').addEventListener('click', () => {
        if (isMaximized) {
            window.resizeTo(screen.availWidth * 0.5, screen.availHeight * 0.5);
            window.moveTo(screen.availWidth * 0.25, screen.availHeight * 0.25);
        } else {
            window.resizeTo(screen.availWidth, screen.availHeight);
            window.moveTo(0, 0);
        }
        isMaximized = !isMaximized;
    });

    // Callback for close button
    document.getElementById('close').addEventListener('click', () => {
        window.close();
    });

    // Callback for refresh button
    document.getElementById('refresh').addEventListener('click', () => {
        window.location.reload();
    });

    // Callback for revert button
    document.getElementById('revert').addEventListener('click', () => {
        if(window.confirm(
            'Are you sure? All your changes will be lost if you proceed.'
        )) {
            window.localStorage.clear();
            window.location.reload();
        }
    });

    // Render the QR code in the UI
    qrcode.toDataURL(ExpressServer.getJoystickURL(), (err, base64ImageURL) => {
        document.getElementById('qrCode').innerHTML =
            `<img src="${base64ImageURL}">`;
    });
});
