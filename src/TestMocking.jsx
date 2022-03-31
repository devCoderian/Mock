import { response } from 'msw';
import React, { useState } from 'react'



const Item = ({ name, age }) => {
    console.log(name);
    return (
        <li>
            name: {name} /age: {age}
        </li>
    )
};

const TestMocking = () => {
    const url = "https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json?id=ian0719";

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    //Service Mocker로 보낼 데이터
    const handleClick = () => {
        //fetch 보내기
        fetch(url).then((res) => {
            return res.json();
        }).then((json) => {
            // console.log(json)
            if (json.errorMessage) {
                throw Error(json.errorMessage);
            }
            setData(json.data);
        }).catch((error) => {
            setError(`Something Wrong:${error}`);
        });
    }

    const handleClick2 = () => {
        fetch('/login').then((res) => {
            // console.log(res);
            // console.log(JSON.stringify(res));
            return res.json();
        }).then((json) => {
            console.log(JSON.stringify(json));
            //let ian = json;
            //console.log('ian', ian.id);
        })
            .catch((error) => {
                setError(`Something Wrong : ${error}`);
            });
    }

    const handleClick3 = () => {
        //service worker에서 파라미터 체크하기
        //mocking service api test용 
        //martiParam 활용
        fetch('/?id=testname&check=testcheck').then((res) => {
            // console.log(res);
            // console.log(JSON.stringify(res));
            return res.json();
        }).then((json) => {
            console.log(json.data);
            setData(json.data);
            //let ian = json;
            //console.log('ian', ian.id);
        }).catch((error) => {
            setError(`Something Wrong:${error}`);
        });
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div>TestMocking</div>
            <button onClick={handleClick}>데이터 가져오기</button>
            <button onClick={handleClick2}>데이터 가져오기2</button>
            <button onClick={handleClick3}>데이터 가져오기3</button>
            {data && (
                <ul>
                    {data.people.map((person) => {
                        //    console.log(person.name); 
                        return <Item key={`${person.name}-${person.age}`} name={person.name} age={person.age} />
                    })}
                </ul>
            )}
        </>
    )
}

export default TestMocking