import { DataVisualizationPage } from './app.po';

describe('data-visualization App', () => {
  let page: DataVisualizationPage;

  beforeEach(() => {
    page = new DataVisualizationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
