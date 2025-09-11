import { Container, Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./Stats.module.css";

function Stats() {
    const colombiaWasteData = [
        { name: "Actividades económicas", value: 13210000, percentage: 53.2 },
        { name: "Hogares", value: 11640000, percentage: 46.8 }
    ];

    const textileRecoveryData = [
        { name: "Textiles no aprovechados", value: 99.5 },
        { name: "Textiles aprovechados", value: 0.5 }
    ];

    const COLORS = ["#52796F", "#354F52", "#84A98C", "#2F3E46"];

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, name
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="12"
                fontWeight="bold"
            >
                {name}
            </text>
        );
    };

    return (
        <section className={styles.stats}>
            <Container>
                <h2 className="text-center mb-3">Impacto Textil en Colombia</h2>
                <p className="text-center mb-5">
                    Datos oficiales muestran la magnitud del problema de residuos textiles
                    y su bajo nivel de aprovechamiento en el país.
                </p>

                <Row className="text-center mb-5">
                    <Col md={4} sm={6} className={styles.statItem}>
                        <h3>541.000</h3>
                        <p>
                            toneladas de residuos urbanos se generan <strong>cada día </strong>
                            en América Latina y el Caribe. (SAL, 2022)
                        </p>
                    </Col>
                    <Col md={4} sm={6} className={styles.statItem}>
                        <h3>24,8M</h3>
                        <p>
                            toneladas de residuos en Colombia en 2018:
                            13,21M de actividades económicas y 11,64M de hogares. (DANE)
                        </p>
                    </Col>
                    <Col md={4} sm={6} className={styles.statItem}>
                        <h3>&lt;1%</h3>
                        <p>
                            de los residuos textiles fueron efectivamente aprovechados en
                            Colombia durante 2020. (SSPD, 2021)
                        </p>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col md={6} className="mb-4">
                        <h4 className="text-center">Distribución residuos Colombia (2018)</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={colombiaWasteData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={renderCustomizedLabel}
                                    labelLine={false}
                                >
                                    {colombiaWasteData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [
                                        `${value.toLocaleString()} toneladas (${props.payload.percentage}%)`,
                                        "Cantidad"
                                    ]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>

                    <Col md={6} className="mb-4">
                        <h4 className="text-center">Aprovechamiento residuos textiles (2020)</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={textileRecoveryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={({ value }) => `${value}%`}
                                    labelLine={false}
                                >
                                    {textileRecoveryData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 1 ? "#84A98C" : "#2F3E46"}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <p className="text-center mt-2">
                            Solo el 0.5% de los residuos textiles se aprovechan, evidenciando una gran oportunidad de mejora
                        </p>
                    </Col>
                </Row>

                <div className={styles.sources}>
                    <p>
                        <strong>Fuentes:</strong> SAL (2022), DANE (2018), SSPD (2021),
                        Naciones Unidas (2019).
                    </p>
                </div>
            </Container>
        </section>
    );
}

export default Stats;