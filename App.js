import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter,
  NativeModules,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const App = () => {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    let subscription;
    subscription = alanEventEmitter.addListener('command', response => {
      console.log(`got command event ${JSON.stringify(response)}`);
      if (response?.command === 'newChart') {
        setChartData({
          labels:
            response?.dates.length > 7
              ? response?.dates.slice(
                  response?.dates.length - 7,
                  response?.dates.length,
                )
              : response?.dates,
          data:
            response?.values.length > 7
              ? response?.values.slice(
                  response?.dates.length - 7,
                  response?.values.length,
                )
              : response?.values,
        });
      } else if (response?.command === 'goBack') {
        setChartData(null);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  console.log(chartData);
  return (
    <View
      style={{
        backgroundColor: '#2c5364',
        flex: 1,
      }}>
      {chartData ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
            }}>
            Bitcoin Prices
          </Text>
          <LineChart
            data={{
              labels: chartData?.labels,
              datasets: [
                {
                  data: chartData?.data,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={350}
            // verticalLabelRotation={50}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#2c5364',
              backgroundGradientFrom: '#203a43',
              backgroundGradientTo: '#0f2027',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#0f2027',
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            xLabelsOffset={40}
            verticalLabelRotation={-50}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              paddingVertical: 20,
              paddingHorizontal: 15,
              borderRadius: 30,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                lineHeight: 40,
                color: 'black',
                textAlign: 'center',
              }}>
              Start to Discover About{' '}
              <Text style={{color: '#12C2ED'}}>Bitcoin</Text> Information
            </Text>
            <Text style={{textAlign: 'center', lineHeight: 25}}>
              Ask any questions about Bitcoin. Alan will solve it. To Go back.
              Say to Alan.
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://cdni.iconscout.com/illustration/premium/thumb/crypto-atm-machine-4292746-3562233.png',
            }}
            style={{
              width: 380,
              height: 380,
            }}
          />
          <Text
            style={{
              fontSize: 28,
              color: 'white',
              fontWeight: '700',
            }}>
            Bitcoin Info
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              paddingVertical: 20,
              paddingHorizontal: 15,
              borderRadius: 40,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                lineHeight: 40,
                color: 'black',
                textAlign: 'center',
              }}>
              Start to Discover About{' '}
              <Text style={{color: '#12C2ED'}}>Bitcoin</Text> Information
            </Text>
            <Text style={{textAlign: 'center'}}>
              Ask any questions about Bitcoin. Alan will solve it
            </Text>
            <Text
              style={{textAlign: 'center', color: 'black', fontWeight: '500'}}>
              How much is Bitcoin?
            </Text>
            <Text
              style={{textAlign: 'center', color: 'black', fontWeight: '500'}}>
              Give me the price of bitcoin over past year.
            </Text>
            <Text
              style={{textAlign: 'center', color: 'black', fontWeight: '500'}}>
              Is bitcoin legal?
            </Text>
          </View>
        </View>
      )}

      <AlanView
        projectid={
          '411664568a6bc3aebae4787777096bfb2e956eca572e1d8b807a3e2338fdd0dc/stage/prod'
        }
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
