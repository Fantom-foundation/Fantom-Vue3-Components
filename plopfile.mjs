import { plopGenerators, plopHelpers } from './plop-templates/index.mjs';

export default function (plop) {
    plopHelpers.forEach((helper) => {
        plop.setHelper(helper.name, helper.fn);
    });

    plopGenerators.forEach((generator) => {
        plop.setGenerator(generator.name, generator.config);
    });
}
