import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Asset } from '@cognite/sdk/dist/src';
// import styles from '../styles/Home.module.scss'
import { useAuth } from '../contexts/AuthContext';
import CogPage from '../components/templates/CogPage';
import CogRoundedContainer from '../components/atoms/CogRoundedContainer';
import CogHeaderFull from '../components/atoms/CogHeaderFull';
import CogTable from '../components/molecules/CogTable';
import { useRoot } from '../contexts/RootContext';

const Home: NextPage = () => {
    const { lastPage } = useRoot();

    const [search, setSearch] = useState<string>('');
    const [assets, setAssets] = useState<Asset[]>({} as Asset[]);

    const {
        handleAuthenticate,
        client
    } = useAuth();

    useEffect(() => {
        handleAuthenticate();
    }, []);

    useEffect(() => {
        async function getAssets() {
            try {
                const assets = await client.assets?.list().autoPagingToArray({ limit: 10 });
                // console.log(assets);

                if (assets !== undefined && typeof assets === 'object') {
                    let newAssets: any = [];

                    assets.map(a => {
                        newAssets.push({
                            id: a.id,
                            name: a.name,
                            description: a.description
                        });
                    })
                    setAssets(newAssets);
                    console.log(assets[0]);
                }
            } catch(err) {
                console.log(err);
            }
        }

        if (client) getAssets();
    }, [client]);

    async function handleSearch() {
        const newSearch = await client.assets.search({
            search: {
                query: search
            }
        });

        setAssets(newSearch);
    }

    function renderAssets() {
        return (
            <table id='assets'>
                <tr key={0}>
                    <th>ID</th>
                    <th>Assets</th>
                    <th>Description</th>
                </tr>
                {
                    assets.map((asset, idx) => {
                        return (
                            <tr key={idx + 1}>
                                <td>{asset.id}</td>
                                <td>{asset.name}</td>
                                <td>{asset.description}</td>
                            </tr>
                        )
                    })
                }

            </table>
        )
    }

    return (
        <>
            <Head>
                <title>Cognite Search</title>
            </Head>

            <CogPage>
                <CogHeaderFull label={'Assets'} icon={'fas fa-box'}>{}</CogHeaderFull>
                <CogRoundedContainer>
                    <CogTable
                        lastPage={lastPage}
                        tableData={{
                            headers: ['ID', 'Asset', 'Description'],
                            data: assets,
                        }}
                        noneMessage={'No assets registered.'}
                        contentType={[
                            {
                                columnIndex: 0,
                                type: 'normal',
                            },
                            {
                                columnIndex: 1,
                                type: 'normal',
                            },
                            {
                                columnIndex: 2,
                                type: 'normal',
                                // type: 'tippy',
                                // content: 'date',
                            }
                        ]}
                    />
                </CogRoundedContainer>
            </CogPage>
        </>
    )
}

export default Home
