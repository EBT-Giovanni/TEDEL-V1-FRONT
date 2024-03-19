import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import * as d3 from 'd3';

const TarifaPorTractor = ({data}) => {

    const formatValueAsMoney = (value) => {
        // Aquí se realiza el formateo con D3.js para mostrar el valor en formato de dinero
        return d3.format('$,.2f')(value);
    };

    return (

        <ResponsivePie
            data={data}
            valueFormat={(value) => formatValueAsMoney(value)}
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

export default TarifaPorTractor