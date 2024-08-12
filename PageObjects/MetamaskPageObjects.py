class MetamaskPageObject:
    METAMASK_XPATH="//div[@class='flex items-center'][descendant::div[contains(text(),'MetaMask')]]"
    # METAMASK_NEXT_XPATH="//button[text()='Next']"
    # METAMASK_CONFIRM_XPATH="//button[text()='Confirm']"
    # METAMASK_SIGNIN_XPATH="//button[text()='Sign-In']"
    METAMASK_PASSWORD_ID='password'
    METAMASK_PASSWORD_XPATH='/html/body/div[1]/div/div/div/div/form/div/div/input'
    METAMASK_UNLOCK_XPATH="//button[@data-testid='unlock-submit' and text()='Unlock']"
    METAMASK_NEXT_BTN_XPATH="//button[@data-testid='page-container-footer-next' and text()='Next']"
    METAMASK_CONFIRM_BTN_XPATH="//button[@data-testid='page-container-footer-next' and text()='Confirm']"
    METAMASK_SIGNIN_BTN_XPATH="//button[@data-testid='page-container-footer-next' and text()='Sign-In']"

    EMAIL_TAG_NAME='input'
    NEXT_TAG_NAME='button'
