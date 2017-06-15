import { ItorahPage } from './app.po';

describe('itorah App', () => {
  let page: ItorahPage;

  beforeEach(() => {
    page = new ItorahPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
