function main() {
    let input_el = document.getElementById("input");
    let output_el = document.getElementById("output");
    let message_el = document.getElementById("message");
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
        var i1 = Math.pow(2*v.d1.value) - 1;
        var l1 = Math.pow(2*v.t1.value);
        var p = v.t1.value * v.c1.value * (i1*2 + l1);
        var f = v.t1.value * (v.c1.value+1);
        input_el.innerHTML = `${wrap_em("t1", v.t1.value)}×
                              (2*(2^${wrap_em("d1", v.d1.value)}-1) + 2^${wrap_em("d1", v.d1.value)}) ×
                              ${wrap_em("c1", v.c1.value)} = ${wrap_em("p", p)}`;

        output_el.innerHTML = `${wrap_em("t1", v.t1.value)}×
                               ${wrap_em("d1", v.d1.value)}=
                              ${wrap_em("f", f)}`;
        message_el.innerHTML = "";
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
            // if ticker exceeds slider max, slider adjusts
            if (parseInt(value_el.value) > parseInt(slider_el.max))
            {
                slider_el.max = parseInt(value_el.value);
            }
            slider_el.value = value_el.value;
            // if ticker exceeds slider min, ticker adjusts
            if (parseInt(value_el.value) < slider_el.value)
            {
                value_el.value = slider_el.value;
            }
            update_input_output();
        };
        slider_el.addEventListener("input", slider_update);
        value_el.addEventListener("input", ticker_update);
        slider_update();
    });
}
window.onload = main;
