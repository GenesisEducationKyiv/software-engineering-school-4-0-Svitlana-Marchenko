import 'tsarch/dist/jest';
import { filesOfProject as files } from 'tsarch';

describe('test architecture dependencies', () => {

    const DATA_ACCESS_LAYER_FOLDER = 'data-access'
    const SERVICE_LAYER_FOLDER = 'service'
    const PRESENTATION_LAYER_FOLDER = 'router'

    it('data access layer should not depend on route layer', async () => {
        await expect(files().inFolder(DATA_ACCESS_LAYER_FOLDER)
            .shouldNot().dependOnFiles().inFolder(PRESENTATION_LAYER_FOLDER))
            .toPassAsync();
    });

    it('route layer should not depend on data access layer', async () => {
        await expect(files().inFolder(PRESENTATION_LAYER_FOLDER)
            .shouldNot().dependOnFiles().inFolder(DATA_ACCESS_LAYER_FOLDER))
            .toPassAsync();
    });

    it('service layer should not depend on route layer', async () => {
        await expect(files().inFolder(SERVICE_LAYER_FOLDER)
            .shouldNot().dependOnFiles().inFolder(PRESENTATION_LAYER_FOLDER))
            .toPassAsync();
    });
});
