const width = 1000,
  height = 500;
const svg = d3.select("#map").attr("viewBox", [0, 0, width, height]);
const projection = d3
  .geoMercator()
  .scale(120)
  .translate([width / 2, height / 1.4]);
const path = d3.geoPath().projection(projection);

d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then(
  (worldData) => {
    const countries = topojson.feature(worldData, worldData.objects.countries);

    const mapGroup = svg.append("g");
    mapGroup
      .selectAll("path")
      .data(countries.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", "#acadaf")
      .style("stroke", "white");

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        mapGroup.attr("transform", event.transform);
      });
    svg.call(zoom);
    d3.select("#zoom-in").on("click", () =>
      svg.transition().call(zoom.scaleBy, 1.5)
    );
    d3.select("#zoom-out").on("click", () =>
      svg.transition().call(zoom.scaleBy, 0.75)
    );
    d3.select("#zoom-reset").on("click", () =>
      svg.transition().call(zoom.transform, d3.zoomIdentity)
    );
    const tooltip_countries = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip_country")
      .style("background", "#333333")
      .style("position", "absolute")
      .style("color", "white")
      .style("padding", "3px 5px")
      .style("pointer-events", "none")
      .style("border-radius", "1rem")
      .style("display", "none")
      .style("width", "100");
    const countryNames = new Map(
      countries.features.map((d) => [d.id, d.properties?.name || ""])
    );

    svg
      .selectAll("path.country")
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).style("fill", "#ccccccff");
        tooltip_countries
          .style("display", "block")
          .html(`<strong>${countryNames.get(d.id)}</strong><br>`);
      })
      .on("mousemove", (event) => {
        const tooltipWidth = tooltip_countries.node().offsetWidth;
        const tooltipHeight = tooltip_countries.node().offsetHeight;
        tooltip_countries
          .style("left", event.pageX - tooltipWidth - 5 + "px")
          .style("top", event.pageY - tooltipHeight - 5 + "px");
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget).style("fill", "#acadaf");
        tooltip_countries.style("display", "none");
      });

    const data = [
      { country: "Vietnam", lon: 106.7056, lat: 10.7324, value: 120 },
      {
        country: "Warehouse (Dong Nai, Vietnam)",
        lon: 106.7056,
        lat: 10.7324,
        value: 120,
        address:
          "No 9 Street, Tam Phuoc Industrial Zone Binh Hoa City, Dong Nai, Vietnam",
        contact: "917 607 105",
      },
      {
        country: "Japan",
        lon: 130.4181,
        lat: 33.5904,
        value: 120,
        address: "2-41-10 Wakammiya, Higashi-ku,Fukuaoka City, 813-0036 Japan",
        contact: "922 015 755 – Nobuo Ogami",
      },
      {
        country: "Canada",
        lon: -64.7782,
        lat: 46.0906,
        value: 120,
        address: "100 Cameron Street, Suite 108, Moncton, NB E1C 5Y6",
        contact: "506 381 9649 – Anh Cao",
      },
      {
        country: "United Kingdom",
        lon: -0.2748,
        lat: 51.4914,
        value: 120,
        address:
          "Suite 126, West Link House, 981 Great West Road, London, TW89DN",
        contact: "00447849958566 – Thoi Nguyen",
      },
      {
        country: "United State",
        lon: -75.7863,
        lat: 41.3198,
        value: 120,
        address: "315 Luzerne Ave. West Pittston, PA 18643",
        contact: "570 883 1155 – Bob Orlando",
      },
      {
        country: "Singapore",
        lon: 103.8198,
        lat: 1.3521,
        value: 120,
        address: "18 Richards Avenue, Singapore 546426",
        contact: "593 780 246 – BS Goh",
      },
      {
        country: "India",
        lon: 77.5946,
        lat: 12.9716,
        value: 120,
        address:
          "42, Cubbon Road, Gr Fl, Post Office Road, Bangalore 560 001, India",
        contact: "984 532 4025 – Arun Shankar",
      },
      {
        country: "Australia",
        lon: 150.8596,
        lat: -33.9966,
        value: 120,
        address: "Shrinivas, 38, Ohlfsen Road,Minto, NSW, 2566, Australia",
        contact: "296 032 718 – Sanjay Bedekar",
      },
      {
        country: "New Zealand",
        lon: 172.6362,
        lat: -43.5321,
        value: 120,
        address: "14 Connemara Drive North Wood, Christchurch, New Zealand",
        contact: "33 238 889 – George Begg",
      },
      {
        country: "U.A.E",
        lon: 55.2708,
        lat: 25.2048,
        value: 120,
        address: "57 Al Kawakeb Property L Quoz Indl-2 Dubai, U.A.E",
        contact: "43 386 567 – Naeem Siddiqui",
      },
    ];

    const mergedData = Array.from(
      d3
        .rollup(
          data,
          (v) => ({
            country: v[0].country,
            lon: d3.mean(v, (d) => d.lon),
            lat: d3.mean(v, (d) => d.lat),
            infos: v.map((d) => ({
              name: d.name,
              address: d.address,
              tel: d.tel,
            })),
          }),
          (d) => d.country
        )
        .values()
    );

    const group = mapGroup.append("g").attr("class", "group");

    group
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("class", "bubble")
      .attr("cx", (d) => projection([d.lon, d.lat])[0])
      .attr("cy", (d) => projection([d.lon, d.lat])[1])
      .attr("r", (d) => Math.sqrt(d.value));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("width", "250px")
      .style("background", "#333333")
      .style("position", "absolute")
      .style("color", "white")
      .style("padding", "8px 10px")
      .style("pointer-events", "none")
      .style("border-radius", "1rem")
      .style("display", "none")
      .style("text-align", "left");

    svg
      .selectAll("circle")
      .on("mouseover", (event, d) => {
        tooltip.style("display", "block")
          .html(`<strong>${d.country}</strong><br>\
                    ${d.address}<br>\
                    Tel: ${d.contact}`);
      })
      .on("mousemove", (event) => {
        const tooltipWidth = tooltip.node().offsetWidth;
        const tooltipHeight = tooltip.node().offsetHeight;

        tooltip
          .style("left", event.pageX - tooltipWidth - 10 + "px")
          .style("top", event.pageY - tooltipHeight - 10 + "px");
      })

      .on("mouseout", (event) => {
        tooltip.style("display", "none");
      });
  }
);

//esg-chart
const ctx = document.getElementById("myChart");
const chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Social", "Governance", "Environment"],
    datasets: [
      {
        data: [1, 1, 1],
        backgroundColor: ["#007500", "#00A800", "#004200"],
        borderColor: ["#007500", "#00A800", "#004200"],
        borderRadius: 10,
        borderWidth: 6,
        spacing: 20,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
      tooltip: { enabled: false },
    },

    animation: {
      onComplete: drawTextOnArcs,
    },
    onResize: () => {
      setTimeout(drawTextOnArcs, 200);
    },
  },
  plugins: [ChartDataLabels],
});

function point(cx, cy, r, angle) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function arcPath(cx, cy, r, startAngle, endAngle, reverse = false) {
  let start, end, sweepFlag;

  if (!reverse) {
    start = point(cx, cy, r, startAngle);
    end = point(cx, cy, r, endAngle);
    sweepFlag = 1;
  } else {
    start = point(cx, cy, r, endAngle);
    end = point(cx, cy, r, startAngle);
    sweepFlag = 0;
  }

  const largeArcFlag = Math.abs(endAngle - startAngle) <= Math.PI ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

function drawTextOnArcs() {
  const svg = document.querySelector(".label-arc");
  svg.setAttribute("width", chart.width);
  svg.setAttribute("height", chart.height);
  svg.innerHTML = "";

  const meta = chart.getDatasetMeta(0);
  meta.data.forEach((arc, i) => {
    const id = `arcPath${i}`;
    const label = chart.data.labels[i];
    const r = (arc.outerRadius + arc.innerRadius) / 2;
    const reverse = label === "Governance";
    const d = arcPath(arc.x, arc.y, r, arc.startAngle, arc.endAngle, reverse);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id", id);
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    svg.appendChild(path);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "25");
    text.setAttribute("font-weight", "700");
    text.setAttribute("text-anchor", "middle");

    const textPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "textPath"
    );
    textPath.setAttribute("href", `#${id}`);
    textPath.setAttribute("startOffset", "50%");
    textPath.textContent = label;
    text.appendChild(textPath);
    svg.appendChild(text);

    if (reverse) {
      text.setAttribute("dy", "20");
    } else {
      text.setAttribute("dy", "-6");
    }
  });
}
window.addEventListener("resize", () => {
  setTimeout(drawTextOnArcs, 300);
});
