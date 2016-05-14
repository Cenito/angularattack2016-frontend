import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstaServiceMock {

    constructor() {
        console.log("InstaServiceMock");
    }

    getLocationInfo(lat: string, lng: string) {

        return new Observable(observer => {
            observer.next([{ id: this.randomInt(42, 42424242) }])
        });
    }

    getImages(locationId: string) {

        var numberOfImages = this.randomInt(1, 5);
        var imageList = new Array();
        for (var index = 0; index < numberOfImages; index++) {
            imageList.push({
                images:{
                    thumbnail:{
                        url: this.fakeImageUrls[this.randomInt(0, this.fakeImageUrls.length)]
                    }
                }
            });
        }

        return new Observable(observer => {
            observer.next(imageList);
        });
    }


    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    fakeImageUrls = [
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13166667_274863016185507_664583563_n.jpg?ig_cache_key=MTI0OTkyNjk0OTc3NjI1NjY5NA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13166945_2052114005014675_1691155854_n.jpg?ig_cache_key=MTI1MDAwMDkzNDE2ODYyMzgxMA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13108761_1741020269516373_2050016625_n.jpg?ig_cache_key=MTI0OTk1NjA0MTExNTM0OTkwNw%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13167352_1772302299671952_780924323_n.jpg?ig_cache_key=MTI1MDAxNDExNjk3MDA5MjI1MA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/e15/12501566_1733245656897132_271081332_n.jpg?ig_cache_key=MTI0OTI4NDUzMzc5NDM0Nzg5MQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13108607_1604282506553236_4268271_n.jpg?ig_cache_key=MTI0OTg5NDE5ODI5NDM2NjQ3NA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/e15/13150878_541737812674179_306458785_n.jpg?ig_cache_key=MTI1MDAyNTU0NTM3MzIwMjAyMA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13167453_1011926598885460_1846344621_n.jpg?ig_cache_key=MTI0OTk2OTQ0MzUxMzIxNDg3OQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13129687_1598365317158911_1728009127_n.jpg?ig_cache_key=MTI0OTkxNzE4OTgwNjQyOTk0Ng%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13151194_771226269645082_50811290_n.jpg?ig_cache_key=MTI0OTkwMTQ5MzczMTgyMDMzNA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13151056_1818646965030402_1911717175_n.jpg?ig_cache_key=MTI0OTUxODkxMzI0NzgzMzEwNw%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13108680_251348281891670_1940883052_n.jpg?ig_cache_key=MTI0OTk4Njc0Mjg2NzYxMDgxNQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13166858_1625906737735195_1401156718_n.jpg?ig_cache_key=MTI0Nzk1MTIyODUyMzk4ODkyNg%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/926288_458070597716418_2105653152_n.jpg?ig_cache_key=MTE5MDIwOTY0OTcwODAxNTEwNw%3D%3D.2.l',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13129911_956613834456348_445266597_n.jpg?ig_cache_key=MTI0OTI5MzY5ODMwNTI1MDU1NQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13167283_541725999363583_2047308344_n.jpg?ig_cache_key=MTI1MDAyODkyNTU5NTI3MzUwMA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13188188_510452119079716_144215148_n.jpg?ig_cache_key=MTI0OTQ3MTE0NzYwODI1MzY0Nw%3D%3D.2.l',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13129985_1783930541838769_1183473870_n.jpg?ig_cache_key=MTI1MDAyMzYzMTI4NzQ1OTM2MQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13187954_901540006638813_630205024_n.jpg?ig_cache_key=MTI1MDAwNzc0NjEzMjc3MjQyNg%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13183534_1024458990975407_1195979814_n.jpg?ig_cache_key=MTI1MDAwNjU3NTUzNjg2OTk1Mg%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13108558_489844107876058_681315022_n.jpg?ig_cache_key=MTI0OTcyNzA5MzU3NDAyODg5Nw%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13113847_1131007280285505_1283006214_n.jpg?ig_cache_key=MTI0OTQzNzE1Mjc5NTIwOTU0NA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13188026_1172737372777128_1356323702_n.jpg?ig_cache_key=MTI0OTMzMjQ0MTM3NzY0MTQ0Mg%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13167347_1827105997517163_1787964718_n.jpg?ig_cache_key=MTI0OTIwNTU5MTIwNTc0MDI3Nw%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12599324_201667490217870_720926517_n.jpg?ig_cache_key=MTIzMTA0MjY1NjQ4NDc3MzA3Ng%3D%3D.2.l',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12940138_522049054586879_132536481_n.jpg?ig_cache_key=MTIzNjE1MzE3MjExMjUxMTcyMw%3D%3D.2.l',
        'https://scontent.cdninstagram.com/l/t51.2885-15/s640x640/sh0.08/e35/13167394_174430746286590_579342147_n.jpg?ig_cache_key=MTI0NDEyMzY1NjcyNDI4MTg5Mg%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13113807_228710384167279_1453880126_n.jpg?ig_cache_key=MTI0NTcyODE3MzMwNzIwNzg1Nw%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13118278_1707004576246933_192487504_n.jpg?ig_cache_key=MTI0NDg3MzkwNzA3MTI2MjU0MQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13126620_625372754282411_677646825_n.jpg?ig_cache_key=MTI0ODAzNTIzNDE0MTg5MDY0Nw%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13126909_942637302519504_409074415_n.jpg?ig_cache_key=MTI0ODAzMTY4MzQ5NTc4MzM5MQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13151145_1195251023848809_2046438474_n.jpg?ig_cache_key=MTI0ODAzMjM0MzEzMzk3MzQ4Ng%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13113709_537071689751379_1418158220_n.jpg?ig_cache_key=MTI0ODAzMjk1NjcxODcwNDY0OQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13150930_1532764583697785_1829611080_n.jpg?ig_cache_key=MTI0ODAzMzY1NzkwNTY3MDE3Nw%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12912625_1201058099934936_1443150310_n.jpg?ig_cache_key=MTIyOTExMDY5MDczNzc5NjM5OA%3D%3D.2.l',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12950381_217504675292441_296582874_n.jpg?ig_cache_key=MTIyNjIxODAxMTQ5MjI1ODQ0OQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12965693_1530672867239922_1592990537_n.jpg?ig_cache_key=MTIzNDc1OTE5MzIxMjkyNzk0OA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12383150_490064581196195_891214911_n.jpg?ig_cache_key=MTIyNjE0MTc4MDM1MDQzMTQwNA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13167315_127091847700247_1198193893_n.jpg?ig_cache_key=MTI0OTQ1OTQ4MDE2MDc2OTYxMA%3D%3D.2.l',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13151057_1690532254530810_716977248_n.jpg?ig_cache_key=MTI0OTk4MzU3MDAyNzcyMDMyMQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13129466_583088201868238_88285167_n.jpg?ig_cache_key=MTI0OTk3NjE5NDQ3MjA1MTA1Nw%3D%3D.2.l2',
        'https://scontent.cdninstagram.com/t51.2885-15/e15/13183465_1600317430281239_114035934_n.jpg?ig_cache_key=MTI0OTk0MTI2NzU4OTg5NTgyNQ%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13130044_881211748668605_1046748395_n.jpg?ig_cache_key=MTI0OTk0MDc1Mjc5MzI2NTg0OA%3D%3D.2',
        'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13108530_1392113710814299_1319503930_n.jpg?ig_cache_key=MTI0OTg3NTEwNjgzNTQxMDQyOA%3D%3D.2',
    ];

}