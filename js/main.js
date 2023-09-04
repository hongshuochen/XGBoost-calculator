function main() {
    let param_el = document.getElementById("param");
    let flop_el = document.getElementById("flop");
    // let message_el = document.getElementById("message");
    let variable_labels = Array.from(document.querySelectorAll("label"));
    let variable_sliders = variable_labels.map(x => x.querySelector("input"));
    let variable_names = variable_labels.map(x => x.classList[0]);
    let v = {};

    variable_names.forEach((name, i) => {
        v[name] = variable_sliders[i];
    });

    function wrap_em(name, value) {
        // put numbers as subscript
        return `<span class="${name}"><em>${value}</em></span>`;
    }

    function update_input_output() {
        var num_decision = Math.pow(2, v.h1.value)-1;
        var num_leaf = Math.pow(2, v.h1.value);
        if (v.d1.value == 2) {
            var c = 1;
        } else {
            var c = v.d1.value;
        }
        var toal_param = (2 * num_decision + num_leaf)*v.w1.value*c;

        param_el.innerHTML = `${wrap_em("w1", v.w1.value)} ×
                              ${wrap_em("d1", c)} × [
                              ${wrap_em("decision", `(2 × (2<sup>${v.h1.value}</sup>-1))`)}+${wrap_em("leaf", `(1 × 2<sup>${v.h1.value}</sup>)`)}
                              ] = ${wrap_em("toal_param", toal_param.toLocaleString('en-US'))}`;

        var total_flops = v.h1.value * v.w1.value * c;

        flop_el.innerHTML = `${wrap_em("w1", v.w1.value)} ×
                            ${wrap_em("d1", c)} ×
                            [ ${wrap_em("compare", v.h1.value)} + ${wrap_em("add", 1)} ] = ${wrap_em("toal_flop", total_flops.toLocaleString('en-US'))}`;
    }

    variable_labels.forEach((label, i) => {
        let value_el = document.createElement("input");
        value_el.type = "number";
        value_el.classList.add("value");
        label.insertBefore(value_el, variable_sliders[i]);
        let slider_el = variable_sliders[i];
        let slider_update = () => {
            value_el.value = slider_el.value;
            update_input_output();
        };
        let ticker_update = () => {
            if (parseInt(value_el.value) > parseInt(slider_el.max))
            {
                slider_el.max = parseInt(value_el.value);
            }
            slider_el.value = value_el.value;
            update_input_output();
        };
        slider_el.addEventListener("input", slider_update);
        value_el.addEventListener("input", ticker_update);
        slider_update();
    });
}
window.onload = main;