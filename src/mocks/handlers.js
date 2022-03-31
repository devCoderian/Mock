import {rest} from 'msw';

export const handlers = [
    
    rest.get('/login', async(req, res, ctx) => {
        return res(
            ctx.json({
                id: 'f79c82c8-c34a-4dc7-a59c-9fadc0979fda',
                firstName: 'John',
                lastName: 'Maverick'
            })
        )
    }),

    rest.get('', async(req, res, ctx) => {
        const id = req.url.searchParams.get('id');
        // 배열도 사용 가능 req.url.searchParams.getAll('id');
        // products?id=1&id=2&id=3
        const check = req.url.searchParams.get('check');
        return res(
            ctx.json(
                {
                    "data": {
                        "people" :
                        [
                            {
                                "name": id,
                                "age": check
                            },
                            {
                                "name": "timmy",
                                "age": 13
                            },
                            {
                                "name": "cindy",
                                "age": 15
                            },
                            {
                                "name": "judy",
                                "age": 25
                            },
                            {
                                "name": "marry",
                                "age": 64
                            },
                            {
                                "name": "tommy",
                                "age": 109
                            }
                        ]
                    }
                }
        )
        )
    }),
 
    //실제 데이터를 받아올 수 있음
    rest.get('https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json', async(req, res, ctx) => {
        
        const id = req.url.searchParams.get('id');

        //다른 endPoint로 옮길수도 있음
        const originalResponse = await ctx.fetch(req);
        const originalResponseData = await originalResponse.json();

        return res(
            // 정상적으로 동작하는 상황
            // ctx.json(
            //     {
            //         "data": {
            //             "people" :
            //             [
            //                 {
            //                     "name": id,
            //                     "age": 27
            //                 },
            //                 ...originalResponseData.data.people,
                         
            //             ]
            //         }
            //     }
            // )
            ctx.status(403), //status 403처리는 되지만 에러메세지를 받기 위해서는 앞단에서 처리를 해주어야 한다.
            //status 강제로 변경하고 거기에대해 json 처리를 해준거기 때문에 catch에 잡히지 않는다.
            ctx.json({
                errorMessage: `Data not found`
            })
        
        )
    })
]