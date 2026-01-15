
from playwright.sync_api import sync_playwright

def verify_console():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for console logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"PageError: {exc}"))

        try:
            page.goto("http://localhost:3000")
            page.wait_for_timeout(5000) # Wait a bit to catch errors
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_console()
