export interface AddRouteTypes {
    roadName: string,
    totalTime: number,
    subwayTransitCount: number,
    firstStartStation: string,
    lastEndStation: string,
    subPaths: [
        {
            trafficType: number,
            distance: number,
            sectionTime: number,
            stationCount: number,
            lanes: [
                {
                    name: string,
                    subwayCode: number,
                    startName: string,
                    endName: string,
                }
            ],
            subways: [
                {
                    index: number
                    stationName: string,
                }
            ]
        }
    ]
}