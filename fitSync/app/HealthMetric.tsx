import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface VitalSignData {
    measurement_date: string;
    value: number;
}

interface BloodPressureData {
    measurement_date: string;
    systolic: number;
    diastolic: number;
}

interface Props {
    metricName: string;
}

const HealthMetricScreen: React.FC<Props> = ({ metricName }) => {
    const [metricHistory, setMetricHistory] = useState<VitalSignData[] | BloodPressureData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const fetchMetricData = async () => {
        //     try {
        //         const response = await axios.get(`https://your-backend-url/api/vitals/${metricName}`);
        //         setMetricHistory(response.data);
        //     } catch (error) {
        //         console.error("Error fetching health metric data:", error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchMetricData();

        // Use test data for demonstration
        const testData = metricName === "Blood Pressure" ? [
            { systolic: 120, diastolic: 80, measurement_date: "2024-10-01 10:00" },
            { systolic: 118, diastolic: 76, measurement_date: "2024-10-02 11:00" },
            { systolic: 122, diastolic: 78, measurement_date: "2024-10-03 12:00" }
        ] : [
            { value: 72, measurement_date: "2024-10-01 10:00" },
            { value: 75, measurement_date: "2024-10-02 11:00" },
            { value: 70, measurement_date: "2024-10-03 12:00" }
        ];

        setMetricHistory(testData);
        setLoading(false);
    }, [metricName]);

    // Get the latest value for display
    const latestValue = metricHistory.length > 0 ? metricHistory[metricHistory.length - 1] : null;
    const latestDisplay = latestValue
        ? ('value' in latestValue
            ? `${latestValue.value}`
            : `${latestValue.systolic}/${latestValue.diastolic}`)
        : 'N/A';

    // Dynamically generate chart data based on metric type
    const chartData = {
        labels: metricHistory.map((data) => {
            if ('measurement_date' in data) {
                return new Date(data.measurement_date).toLocaleDateString();
            }
            return "";
        }),
        datasets: [
            {
                data: metricHistory.map((data) => {
                    if ('value' in data) {
                        return data.value;
                    } else if ('systolic' in data && 'diastolic' in data) {
                        return (data.systolic + data.diastolic) / 2;
                    }
                    return 0;
                }),
                strokeWidth: 2,
            },
        ],
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.latestBox}>
                <Text style={styles.metricType}>{metricName}</Text>
                <Text style={styles.latestValue}>{latestDisplay}</Text>
            </View>
            <Text style={styles.header}>{metricName} History</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#4386F4" />
            ) : (
                <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                    <LineChart
                        data={chartData}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#f3f3f3',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 155, 155, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        style={styles.chart}
                    />
                </View>
            )}
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Additional Information:</Text>
                <Text style={styles.detailText}>
                    {metricName} is an important health metric that helps track your overall well-being. Ensure to keep a consistent log for better monitoring.
                </Text>
            </View>
            <View style={styles.tipsBox}>
                <Text style={styles.infoText}>Tips:</Text>
                <Text style={styles.detailText}>
                    - Regularly monitor your {metricName} to observe trends.{"\n"}
                    - Consult with your healthcare provider if there are significant changes.{"\n"}
                    - Maintain a balanced diet and stay hydrated.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    latestBox: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    metricType: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    latestValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#15b9a6',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    chart: {
        borderRadius: 10,
        marginVertical: 10,
    },
    infoBox: {
        backgroundColor: '#15b9a655',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    tipsBox: {
        backgroundColor: '#15b9a655',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 16,
        lineHeight: 22,
    },
});

export default HealthMetricScreen;
