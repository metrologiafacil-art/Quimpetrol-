
from playwright.sync_api import sync_playwright

def verify_app_load():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")
            # Wait for any text content to load, maybe the selector was wrong
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/debug_page.png")
            print("Screenshot taken")

            # Try to find something we know exists in Login.tsx
            # I need to see Login.tsx content first to be sure
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app_load()
