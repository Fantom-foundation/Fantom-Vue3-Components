import FLazyComponent from './FLazyComponent.vue';
import { AsyncComponents } from '../../utils/index.js';
import { markRaw } from 'vue';

export default {
    title: 'FLazyComponent',
    component: FLazyComponent,
};

const Component1 = {
    template: `<div style="width: 30px; height: 30px; background: tomato"></div>`,
    mounted() {
        alert('Component1 mounted');
    },
};

AsyncComponents.registerComponents({
    Component1: markRaw(Component1),
});

export const Default = () => ({
    components: { FLazyComponent },
    template: `
        <div>
        <div id="flc_root" style="max-width: 400px; margin: 0 auto; height: 400px; overflow: auto">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut dolorum et inventore quidem unde, vitae? Aliquid, cupiditate error eveniet impedit iste maiores nemo porro provident quasi quod totam voluptate?</div><div>Asperiores consequatur culpa deserunt doloremque eius excepturi exercitationem iusto molestias, nihil officiis perferendis possimus, quo, sapiente sequi ut. Ad blanditiis consectetur ea exercitationem fugiat laborum maiores maxime, nostrum numquam! Molestias?</div><div>Ab alias, amet at deleniti fugit ipsa laboriosam laudantium libero maxime modi molestias natus nihil, odio officiis repudiandae sapiente sequi, sint suscipit vitae voluptatem! Assumenda consectetur eius eligendi nulla velit?</div><div>Architecto cum error provident quae repudiandae soluta vero. Ad aliquid asperiores assumenda distinctio dolor ex facere illum libero magni natus neque, officia officiis perspiciatis possimus quia sapiente veritatis vitae voluptate.</div>

            <FLazyComponent component-key="Component1" root="#flc_root" />

            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cumque ipsum iusto voluptatum? Consectetur cumque cupiditate debitis dicta dolore enim exercitationem facilis fuga impedit, laboriosam laborum obcaecati odit praesentium reiciendis.</div><div>Ab commodi dolor, harum incidunt ipsa ipsam odio provident veniam? Eaque eum laudantium totam! A, aliquam aperiam, beatae, debitis delectus eaque fuga modi numquam perspiciatis possimus quo quos! Quasi, voluptate!</div><div>Ab aliquam autem corporis eligendi ex, harum incidunt libero maiores molestias necessitatibus neque perferendis possimus quae quasi repudiandae. Asperiores, deleniti dolores ipsam mollitia nulla omnis reprehenderit. Delectus dicta illo maiores?</div><div>At blanditiis delectus dolorem explicabo ipsum maiores officiis repellat. Alias aperiam architecto aut, consectetur deleniti earum ex exercitationem hic illum in labore laborum laudantium molestias quos recusandae tenetur voluptate! Distinctio.</div><div>A aliquam aliquid animi aspernatur aut autem dolores doloribus exercitationem explicabo facilis hic laboriosam laborum maiores minima necessitatibus nemo non omnis praesentium, rem suscipit temporibus voluptatem voluptates. Nesciunt, provident, vero?</div>
        </div>
        </div>
    `,
});
