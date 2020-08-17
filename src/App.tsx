import React from "react";
import logo from "./logo.svg";
import { Button, Card, Menu } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
const { ipcRenderer } = window.require("electron");

interface ComponentClickedEvent {
    type: string, name: string, value: any
}

const App = () => {

    const onComponentClick = (event: ComponentClickedEvent) => {
        ipcRenderer.send("componentClicked", event)
    }

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
            </Card>
        </div>
    );
}

export default App;
