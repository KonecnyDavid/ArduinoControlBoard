import React, { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Button, Card, Menu } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Loader, { useLoading } from './component/Loader/index';
const { ipcRenderer } = window.require("electron");

interface ComponentClickedEvent {
    type: string, name: string, value: any
}

type LoadingFunction = (...args: any[]) => any;


const App = () => {
    const [loading, setLoading] = useState(false);
    const withLoading = (closure: LoadingFunction) => {
        return (...args: any[]) => {
            setLoading(true);
            console.log("pre")
            closure(...args);
            console.log("post")
            setLoading(false);
        }
    }

    const onComponentClick = withLoading((event: ComponentClickedEvent) => {
        ipcRenderer.sendSync("componentClicked", event)
    })

    useEffect(withLoading(() => {
        for (let index = 0; index < 1000000; index++) {
            
        }
    }))

    return (
        <div className="App" style={{ padding: "1rem"}}>
            <Menu>
                <Menu.Item>Ovládací panel</Menu.Item>

                <Menu.Item>Nová komponenta</Menu.Item>

                <Menu.Item>Nastavení</Menu.Item>
            </Menu>
            <Card>
                <Card.Content>
                    <Card.Header>LED přepínač</Card.Header>
                    <Card.Meta>On/Off komponenta</Card.Meta>
                    <Card.Description>
                        Zapne/vypne připojené LED světlo
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button basic color="green" onClick={() => onComponentClick({type: "on-off", name: "default_led", value: "on"})}>
                            Turn on
                        </Button>
                        <Button basic color="red" onClick={() => onComponentClick({type: "on-off", name: "default_led", value: "off"})}>
                            Turn off
                        </Button>
                    </div>
                </Card.Content>
                <Loader display={loading}></Loader>
            </Card>
        </div>
    );
}

export default App;
