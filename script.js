document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const buttonContainer = document.getElementById('button-container'); // Riferimento al container dei bottoni

    let movements = {
        box1: { x: null, y: null, z: null },
        box2: { x: null, y: null, z: null },
        box3: { x: null, y: null, z: null }
    };

    function getCoordinates(event) {
        if (event.touches) {
            return { x: event.touches[0].clientX, y: event.touches[0].clientY };
        } else {
            return { x: event.clientX, y: event.clientY };
        }
    }

    let startX, startY, initialTranslations = {
        box1: { x: 120, y: 147, z: 0 },
        box2: { x: 60, y: -220.5, z: 0 },
        box3: { x: -180, y: 73.5, z: 0 }
    };

    function startDrag(event) {
        let coords = getCoordinates(event);
        startX = coords.x;
        startY = coords.y;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', onMouseMove, { passive: false });
        document.addEventListener('touchend', stopDrag);
    }

    function onMouseMove(event) {
        event.preventDefault();
        let coords = getCoordinates(event);
        let deltaX = coords.x - startX;
        let deltaY = coords.y - startY;

        applyMovement('box1', initialTranslations.box1.x + deltaX, initialTranslations.box1.y + deltaY, 0);
        applyMovement('box2', initialTranslations.box2.x + deltaX * 0.5, initialTranslations.box2.y - deltaY * 1.5, 0);
        applyMovement('box3', initialTranslations.box3.x - deltaX * 1.5, initialTranslations.box3.y + deltaY * 0.5, 0);
    }

    function applyMovement(boxId, moveX, moveY, moveZ) {
        const box = document.getElementById(boxId);
        box.style.transform = `translate(${moveX}px, ${moveY}px)`;
        movements[boxId].x = moveX;
        movements[boxId].y = moveY;
        movements[boxId].z = moveZ;
        checkAllZero();
    }

    let buttonDisplayed = false;

    function checkAllZero() {
        const allInRange = Object.values(movements).every(coords => 
            coords.x.toFixed(2) >= 0.00 && coords.x.toFixed(2) <= 0.10 &&
            coords.y.toFixed(2) >= 0.00 && coords.y.toFixed(2) <= 0.10 &&
            coords.z.toFixed(2) >= 0.00 && coords.z.toFixed(2) <= 0.10
        );
        if (allInRange) {
            buttonDisplayed = true;
        }
        if (buttonDisplayed) {
            buttonContainer.style.display = 'block'; // Mantiene visibile il button-container
        }
    }

    function stopDrag() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', stopDrag);
    }

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('touchstart', startDrag, { passive: false });
});
