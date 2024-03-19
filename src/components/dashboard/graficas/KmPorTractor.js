import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const KmPorTractor = ({data}) => {

    const formatValueAsDecimal = (value) => {
        // Redondeamos el valor a dos decimales y lo representamos como cadena
        return value.toFixed(2);
    };

return (

    <ResponsivePie
        data={data.map((item) => ({
            ...item,
            value: formatValueAsDecimal(item.value)
        }))}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{ theme: 'background' }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        legends={[]}
    />
)


}

export default KmPorTractor