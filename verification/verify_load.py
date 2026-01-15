
from playwright.sync_api import sync_playwright

def verify_app_load():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")
            page.wait_for_selector("text=ACCESO A SISTEMAS", timeout=10000)
            print("Successfully loaded login page")
            page.screenshot(path="verification/login_page.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app_load()
