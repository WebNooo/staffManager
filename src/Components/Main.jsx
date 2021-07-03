import {Layout} from "antd";

import Staff from "./Staff/Staff";
import HeaderApp from "./HeaderApp";

export default function Main() {
    const {Content} = Layout;

    return <Layout style={{minHeight: "100vh"}}>
        <HeaderApp/>
        <Content>
            <Staff/>
        </Content>
    </Layout>
}