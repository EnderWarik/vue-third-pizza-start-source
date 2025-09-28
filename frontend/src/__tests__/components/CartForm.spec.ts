import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import CartForm from "@/modules/cart/components/CartForm.vue";

describe("CartForm", () => {
  const addresses = [
    {
      id: 1,
      name: "A",
      street: "B",
      building: "C",
      flat: "D",
      comment: "E",
      userId: "F",
    },
  ];

  const globalStubs = {
    DropdownComponent: {
      template: `
        <label>
          <select
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            data-test="delivery-select"
          >
            <option v-for="o in options" :key="o.value" :value="o.value">{{ o.text }}</option>
          </select>
        </label>
      `,
      props: {
        modelValue: { type: String, default: "" },
        options: { type: Array, default: () => [] },
        name: { type: String, default: "" },
      },
    },

    TextInput: {
      template: `
        <label>
          <slot />
          <input
            :name="name"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            data-test="text-input"
          />
        </label>
      `,
      props: {
        modelValue: { type: String, default: "" },
        name: { type: String, default: "" },
        placeholder: { type: String, default: "" },
      },
    },

    FormLine: {
      template: `
        <label>
          <input
            :name="name"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            data-test="form-line-input"
          />
        </label>
      `,
      props: {
        modelValue: { type: String, default: "" },
        name: { type: String, default: "" },
        label: { type: String, default: "" },
        small: { type: Boolean, default: false },
      },
    },
  };

  it("показывает поля адреса при delivery='new' и эмитит обновления моделей", async () => {
    const wrapper = mount(CartForm, {
      props: {
        addresses,
        delivery: "new",
        phone: "",
        street: "",
        house: "",
        apartment: "",
      },
      global: { stubs: globalStubs },
    });

    expect(wrapper.find('[class*="address"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Новый адрес");

    await wrapper.find('input[name="tel"]').setValue("+7 900 000-00-00");
    await wrapper.find('input[name="street"]').setValue("Ленина");
    await wrapper.find('input[name="house"]').setValue("10");
    await wrapper.find('input[name="apartment"]').setValue("5");

    expect(wrapper.emitted()["update:phone"]?.[0]).toEqual([
      "+7 900 000-00-00",
    ]);
    expect(wrapper.emitted()["update:street"]?.[0]).toEqual(["Ленина"]);
    expect(wrapper.emitted()["update:house"]?.[0]).toEqual(["10"]);
    expect(wrapper.emitted()["update:apartment"]?.[0]).toEqual(["5"]);
  });

  it("скрывает блок адреса при выборе существующего адреса", async () => {
    const wrapper = mount(CartForm, {
      props: {
        addresses,
        delivery: "new",
        phone: "",
        street: "",
        house: "",
        apartment: "",
      },
      global: { stubs: globalStubs },
    });

    expect(wrapper.find('[class*="address"]').exists()).toBe(true);

    const select = wrapper.find('[data-test="delivery-select"]');
    await select.setValue("1");
    await nextTick();

    expect(wrapper.emitted()["update:delivery"]?.[0]).toEqual(["1"]);
    expect(wrapper.find('[class*="address"]').exists()).toBe(false);
  });

  it("рендерит варианты в дропдауне: сначала 'Новый адрес', затем дополнительные адреса", async () => {
    const wrapper = mount(CartForm, {
      props: {
        addresses,
        delivery: "new",
        phone: "",
        street: "",
        house: "",
        apartment: "",
      },
      global: { stubs: globalStubs },
    });

    const options = wrapper.findAll('[data-test="delivery-select"] option');
    const texts = options.map((o) => o.text());
    const values = options.map((o) => (o.element as HTMLOptionElement).value);

    expect(texts[0]).toBe("Новый адрес");
    expect(values[0]).toBe("new");
    expect(texts).toContain("A");
    expect(values).toContain("1");
  });
});
