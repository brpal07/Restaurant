import { BuilderTemplateSchedulerPage } from './app.po';

describe('angular-restaurant-php-frontend App', () => {
  let page: BuilderTemplateSchedulerPage;

  beforeEach(() => {
    page = new BuilderTemplateSchedulerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
