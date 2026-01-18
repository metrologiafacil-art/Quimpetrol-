
from playwright.sync_api import sync_playwright, expect

def test_code_splitting(page):
    # 1. Arrange: Go to the app
    page.goto("http://localhost:3000")

    # Wait for login
    expect(page.get_by_text("ACCESO AUTORIZADO")).to_be_visible()

    # 2. Act: Login
    page.fill("input[type='password']", "SGC2025")

    # Use a more generic selector for the button as the text might be complex
    page.get_by_role("button", name="INGRESAR AL SISTEMA").click()

    # Wait for Dashboard
    expect(page.get_by_text("CENTRO OPERATIVO SGC")).to_be_visible()

    # Click on SGC DINAMICO which is now lazy loaded
    page.click("button:has-text('SGC DINÁMICO')")

    # 3. Assert: Verify it loaded
    expect(page.get_by_text("ASISTENTE VALIA SGC")).to_be_visible()

    # 4. Screenshot
    page.screenshot(path="verification/sgc_dinamico_loaded.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_code_splitting(page)
            print("Test passed successfully")
        except Exception as e:
            print(f"Test failed: {e}")
            page.screenshot(path="verification/failure.png")
            raise e
        finally:
            browser.close()
