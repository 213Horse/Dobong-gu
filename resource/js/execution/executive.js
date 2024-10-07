/***************chart d3***************/

class barChart {
    constructor(config) {
        this.config = config;
        this.initializeChart();
    }
    initializeChart() {
        const classId = this.config.classId || "#bar-chart";
        const container = document.querySelector(`#${classId}`);
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const data = this.config.data
        const width = containerWidth
        const height = containerHeight;
        const margin = 30;

        const svg = d3.select(`#${classId}`)
            .append("svg")
            .attr("width", width + margin * 2)
            .attr("height", height + margin * 3)
            .append("g")
            .attr("transform", `translate(${margin}, ${margin})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, width])
            .padding(0.3);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .selectAll("text")
            .attr("x", -x.bandwidth() / 4)
            .attr("dy", "2em");

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(5).tickSize(0));



        svg.selectAll(".barchart-column ")
            .data(data)
            .enter().append("path")
            .attr("class", "barchart-column")
            .attr("d", d => {
                const xPos = x(d.label);
                const yPos = y(d.value);
                const barWidth = x.bandwidth() / 2;
                const barHeight = height - yPos;
                return `
                    M${xPos},${height} 
                    L${xPos},${yPos + 8} 
                    Q${xPos},${yPos},${xPos + 8},${yPos} 
                    L${xPos + barWidth - 8},${yPos} 
                    Q${xPos + barWidth},${yPos},${xPos + barWidth},${yPos + 8}
                    L${xPos + barWidth},${height} 
                    Z
                `;
            }).attr("fill", d => d.color);


        svg.selectAll(".bar-label")
            .data(data)
            .enter().append("text")
            .attr("class", "bar-label")
            .attr("x", d => x(d.label) + x.bandwidth() / 4)
            .attr("y", d => y(d.value) - 6)
            .text(d => `${d.value}개`);
    }

}


/***************piechart-process.js***********/


class donutChartProcess {
    constructor(config) {
        this.config = {
            classId: config.classId || "donutChart",
            data: config.data || [{ value: 0 }],
            achievedColor: config.achievedColor || "#DDD",
            label: config.label || "Value",
            ...config
        };
        this.initializeChart();
    }

    initializeChart() {
        const { classId, data, achievedColor, label } = this.config;
        const container = document.querySelector(`#${classId}`);

        const containerWidth = container.clientWidth || 400;
        const containerHeight = container.clientHeight || 350;
        const width = containerWidth;
        const height = containerHeight

        const radius = Math.min(width, height) / 2;

        const svg = d3.select(`#${classId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const pie = d3.pie().value(d => d.value).sort(null);

        const arcBackground = d3.arc()
            .innerRadius(radius - 20)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const arcAchieved = d3.arc()
            .innerRadius(radius - 20)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(2 * Math.PI * (data[0].value / 100));

        svg.append("path")
            .attr("d", arcBackground)
            .attr("fill", '#f5f5f5');

        svg.append("path")
            .attr("d", arcAchieved)
            .attr("fill", achievedColor);

        svg.append("text")
            .attr("class", "chart-text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.5em")
            .text(label)
            .style('font-size', '14px')
            .style('font-weight', '700')
            .style('fill', achievedColor)

        svg.append("text")
            .attr("class", "chart-text-num")
            .attr("text-anchor", "middle")
            .attr("dy", "0.9em")
            .text(`${data[0].value}`)
            .style('font-size', '36px')
            .style('font-weight', '700')
            .style('fill', achievedColor)
            .append("tspan")
            .text('%')
            .attr('font-size', '12px')
            .attr('dy', '-0.1em');
    }
}


/**********piechart.js*******/

class pieChart {
    constructor(config) {
        this.config = config;
        this.initializeChart();
    }

    initializeChart() {
        const classId = this.config.classId || "#piechart";
        const container = document.querySelector(`#${classId}`);
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const width = containerWidth;
        const height = containerHeight;
        const margin = this.config.margin || 32;
        const radius = Math.min(width, height) / 2 - margin;
        const data = this.config.data;

        const svg = d3.select(`#${classId}`)
            .append("svg")
            .attr("width", width * 2)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.value))
            .range(["#D2222C", "#BD37B1", "#4A56BD", "#00712D"]);

        const pie = d3.pie()
            .value(d => d.value)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(radius * 0.52)
            .outerRadius(radius);

        svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.value));

        const maxData = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);

        svg.selectAll('text.chart-label-text')
            .data(pie(data))
            .enter()
            .append('text')
            .attr('class', 'chart-label-text')
            .attr('transform', d => {
                if (d.data.value >= 10) {
                    return 'translate(' + arc.centroid(d) + ')';
                }
                return null;
            })
            .text(d => d.data.value >= 10 ? d.data.value : '')
            .append("tspan")
            .text(d => d.data.value >= 10 ? '%' : '')
            .attr('font-size', '12px')
            .attr('dy', '0');

        svg.selectAll('text.chart-outside-label')
            .data(pie(data))
            .enter()
            .append('text')
            .attr('class', 'chart-outside-label')
            .style('font-weight', '700')
            .style('font-size', '18px')
            .attr('transform', d => {
                if (d.data.value < 9) {
                    const pos = d3.arc()
                        .outerRadius(radius * 1.1)
                        .innerRadius(radius * 1.1)
                        .centroid(d);
                    pos[0] = pos[0] + (pos[0] > 0 ? 20 : -20);
                    return 'translate(' + pos + ')';
                }
                return null;
            })
            .style('text-anchor', d => (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : 'start')
            .text(d => d.data.value < 9 ? d.data.value : '')
            .append("tspan")
            .text(d => d.data.value < 9 ? '%' : '')
            .attr('dx', 2)
            .style('font-size', '12px');




        svg.selectAll('polyline')
            .data(pie(data))
            .enter()
            .append('polyline')
            .attr('stroke', '#B0B6BB')
            .attr('stroke-width', 1)
            .attr('fill', 'none')
            .attr('points', d => {
                if (d.data.value < 9) {
                    const posA = d3.arc()
                        .outerRadius(radius)
                        .innerRadius(radius)
                        .centroid(d);
                    const posB = d3.arc()
                        .outerRadius(radius * 1.1)
                        .innerRadius(radius * 1.1)
                        .centroid(d);

                    let posC = [posB[0] + (posB[0] > 0 ? 20 : -20), posB[1]];

                    posC[0] = Math.max(-width / 2, Math.min(width / 2, posC[0]));
                    posC[1] = Math.max(-height / 2, Math.min(height / 2, posC[1]));

                    return [posA, posB, posC];
                }
            });

        svg.append("text")
            .attr("class", "chart-center-text")
            .attr("y", -15)
            .text("공약이행률");

        svg.append("text")
            .attr("class", "chart-center-text-percentage")
            .attr("y", 30)
            .text(maxData.value)
            .append("tspan")
            .text('%')
            .attr('font-size', '20px')
            .attr('dy', '0');
    }

}





document.addEventListener("DOMContentLoaded", function () {
    const dataPiechart = [{ value: 12 }, { value: 37 }, { value: 49 }, { value: 2 }];
    const piechart = new pieChart({
        classId: "piechart",
        data: dataPiechart,
    });


    const dataChartProcess1 = [{ value: 90 }];
    const chartProcess1 = new donutChartProcess({
        classId: "donutChart1",
        data: dataChartProcess1,
        achievedColor: "#D2222C",
        label: "공약이행률",
    });



    const dataChartProcess2 = [{ value: 45 }];
    const chartProcess2 = new donutChartProcess({
        classId: "donutChart2",
        data: dataChartProcess2,
        achievedColor: "#1E7A98",
        label: "공약이행률",

    });

    const dataChartProcess3 = [{ value: 31 }];
    const chartProcess3 = new donutChartProcess({
        classId: "donutChart3",
        data: dataChartProcess3,
        achievedColor: "#BD37B1",
        label: "공약이행률",

    });


    const dataChartProcess4 = [{ value: 40 }];
    const chartProcess4 = new donutChartProcess({
        classId: "donutChart4",
        data: dataChartProcess4,
        achievedColor: "#00712D",
        label: "공약이행률",

    });


    const dataChartProcess5 = [{ value: 100 }];
    const chartProcess5 = new donutChartProcess({
        classId: "donutChart5",
        data: dataChartProcess5,
        achievedColor: "#4A56BD",
        label: "공약이행률",
    });

    const databarchart = [
        { label: "도봉구", value: 26, color:"#FC7282"},
        { label: "서울시", value: 7, color:"#00C7AA"},
        { label: "중앙정부", value: 2, color:"#FF9A6F"},
        { label: "시/구", value: 11, color:"#24B4FD"},
        { label: "정부시/구", value: 2, color:"#E072F1"},
        { label: "기타(민간)", value: 3, color:"#4E60FE"}
    ];
    const myBarchart = new barChart({
        classId: "bar-chart",
        data: databarchart,
    });



    function createBarChart(container) {
        const leftLabel = container.getAttribute('data-left-label');
        const rightLabel = container.getAttribute('data-right-label');
        const leftValue = parseInt(container.getAttribute('data-left-value'));
        const rightValue = parseInt(container.getAttribute('data-right-value'));

        const totalValue = leftValue + rightValue;
        const leftPercentage = (leftValue / totalValue) * 100;
        const rightPercentage = (rightValue / totalValue) * 100;

        const chartHTML = `
        <div class='chart-txt'>
            <div class="chart-label">${leftLabel}</div>
            <div class="chart-label">${rightLabel}</div>
        </div>
             <div class="chart-bar">
                <div class="bar-left" style="width: ${leftPercentage}%;"><span class='text-left'>${leftValue}개</span></div>
                <div class="bar-right" style="width: ${rightPercentage}%;"><span class='text-right'>${rightValue}개</span></div>
            </div>
            <div class="chart-info">
                <span>${leftValue}개</span>
                <span>${rightValue}개</span>
            </div>
        </div>
        `;
        container.innerHTML = chartHTML;
    }

    document.querySelectorAll('.chart-container').forEach(createBarChart);


});


/****************tab-excution-statistical.html******/

$(document).ready(function () {
    $('.pj-items').click(function () {
        $('.pj-items').removeClass('active');
        $('.map-pj-lg').removeClass('active');

        $(this).addClass('active');
        var index = $(this).index();
        $('.map-pj-lg').eq(index).addClass('active');
    });
});





