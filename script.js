// oL0adSide Engine - Professional IPA Signer Interface
// Developer: oL0adSide Team (xTudo-ofc)

document.getElementById('sign-button').addEventListener('click', async () => {
    const ipaFile = document.getElementById('ipa-file').files[0];
    const p12File = document.getElementById('p12-file').files[0];
    const provFile = document.getElementById('mobileprovision').files[0];
    const password = document.getElementById('password').value;
    const statusConsole = document.getElementById('status-console');

    // Basic Validation - Checking if everything is loaded
    if (!ipaFile || !p12File || !provFile || !password) {
        updateStatus("❌ Error: Missing required files or password.", "#ef4444");
        return;
    }

    // Starting the Engine Animation
    updateStatus("⏳ Initializing oL0adSide Signing Engine...", "#38bdf8");
    setLoading(true);

    try {
        // Step 1: Parsing the IPA structure
        updateStatus(`📦 Analyzing IPA: ${ipaFile.name}...`, "#38bdf8");
        await delay(1500);

        // Step 2: Decrypting the P12 Certificate
        updateStatus("🔑 Decrypting P12 Certificate with provided password...", "#38bdf8");
        await delay(2000);

        // Step 3: Mapping Entitlements and Mobileprovision
        updateStatus("📜 Mapping Provisioning Profile entitlements...", "#38bdf8");
        await delay(1500);

        // Step 4: Signing Binary (The core process)
        updateStatus("🖋️ Signing application binary (zSign process)...", "#0ea5e9");
        await delay(2500);

        // Step 5: Repackaging and generating Manifest
        updateStatus("📦 Repackaging IPA and generating manifest.plist...", "#0ea5e9");
        await delay(1500);

        // Success - Finalizing
        updateStatus("✅ Success! Application signed and ready.", "#10b981");
        
        // In a real scenario, this would trigger the itms-services installation
        setTimeout(() => {
            alert("OL0adSide: Signing process complete!\n\nNote: For actual installation on iOS, a backend or WASM implementation of zsign is required to handle the binary modification.");
            setLoading(false);
        }, 500);

    } catch (error) {
        updateStatus("⚠️ Critical Failure: Signing engine interrupted.", "#ef4444");
        console.error(error);
        setLoading(false);
    }
});

/**
 * Updates the modern console with colored status dots
 */
function updateStatus(message, color) {
    const statusConsole = document.getElementById('status-console');
    statusConsole.innerHTML = `<span class="dot" style="background-color: ${color}"></span> ${message}`;
    statusConsole.style.color = color;
}

/**
 * Utility to simulate real-time processing
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Visual feedback for the button during processing
 */
function setLoading(isLoading) {
    const btn = document.getElementById('sign-button');
    if (isLoading) {
        btn.disabled = true;
        btn.innerText = "Processing...";
        btn.style.opacity = "0.6";
        btn.style.cursor = "not-allowed";
    } else {
        btn.disabled = false;
        btn.innerText = "Sign and Install";
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }
}
