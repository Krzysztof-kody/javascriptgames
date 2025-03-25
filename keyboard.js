class KeyboardHandler {
    constructor() {
        this.pressedKeys = {}; // Tracks if a key is currently pressed (true/false)
        this.keyPressOrder = []; // Stores the order in which keys were first pressed and are still held down (one instance per key)
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (!this.pressedKeys[key]) {
            this.pressedKeys[key] = true;
            this.keyPressOrder.push(key);
        }
    }

    handleKeyUp(event) {
        const key = event.key.toLowerCase();
        this.pressedKeys[key] = false;
        // Remove all instances of the released key from the order array
        this.keyPressOrder = this.keyPressOrder.filter(k => k !== key);
    }

    getFirstPressedKey() {
        return this.keyPressOrder[0] || null;
    }

    getAllPressedKeysInOrder() {
        return [...this.keyPressOrder]; // Return a copy
    }

    isKeyPressed(key) {
        return !!this.pressedKeys[key.toLowerCase()];
    }
}

// How to use the library:
// 1. Create an instance of the KeyboardHandler class.
//    const keyboard = new KeyboardHandler();
//
// 2. Check if a specific key is pressed:
//    if (keyboard.isKeyPressed("w")) {
//        console.log("W is pressed");
//    }
//
// 3. Get the first key that was pressed and is still held down (only one instance per key):
//    const firstKey = keyboard.getFirstPressedKey();
//    if (firstKey) {
//        console.log("First pressed key:", firstKey);
//    }
//
// 4. Get an array of all currently pressed keys in the order they were first pressed (only one instance per key):
//    const pressedKeysInOrder = keyboard.getAllPressedKeysInOrder();
//    if (pressedKeysInOrder.length > 0) {
//        console.log("Currently pressed keys in order:", pressedKeysInOrder);
//    }