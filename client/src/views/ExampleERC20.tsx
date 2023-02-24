import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { TokenSaleDemo } from '../components/exampleERC20/tokenSaleDemo/TokenSaleDemo';
import { TokenSaleInterface } from '../components/exampleERC20/tokenSaleInterface/TokenSaleInterface';
import { TokenSaleViewCodeContract } from '../components/exampleERC20/tokenSaleViewCodeContract/TokenSaleViewCodeContract';
import { TokenSaleViewCodeInteract } from '../components/exampleERC20/tokenSaleViewCodeInteract/TokenSaleViewCodeInteract';


export const ExampleERC20 = () => {
  return (
    <Tabs
      defaultActiveKey="interface"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="interface" title="Interface">
        <TokenSaleInterface />
      </Tab>
      <Tab eventKey="demo" title="Demo">
        <TokenSaleDemo/>
      </Tab>
      <Tab eventKey="code-interact" title="View Code Interact">
        <TokenSaleViewCodeInteract />
      </Tab>
      <Tab eventKey="code-contract" title="View Code Contract">
        <TokenSaleViewCodeContract/>
      </Tab>
    </Tabs>
  );
}

