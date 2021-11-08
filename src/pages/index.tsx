import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Asset } from '@cognite/sdk';
import { useAuth } from '../contexts/AuthContext';
import CogPage from '../components/templates/CogPage';
import CogRoundedContainer from '../components/atoms/CogRoundedContainer';
import CogHeaderFull from '../components/atoms/CogHeaderFull';
import CogTable from '../components/molecules/CogTable';
import { useRoot } from '../contexts/RootContext';
import { useRouter } from 'next/router';
import CogFilter from '../components/molecules/CogFilter';
import { useFilters } from '../contexts/FilterContext';

const Home: NextPage = () => {
    const { lastPage, currentPagination, handleLastPage, handleCurrentPagination } = useRoot();
    const { client, loggedIn, handleLoggedIn, } = useAuth();
    const { filters } = useFilters();

    const router = useRouter();

    const [actualPage, setActualPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [assets, setAssets] = useState<Asset[]>({} as Asset[]);


    useEffect(() => {
        // async function getAssets() {
        //     try {
        //         const searchAssets = await client.assets?.list().autoPagingToArray({ limit: 10 });

        //         await (await client.assets?.list()).next
        //         if (searchAssets !== undefined && typeof searchAssets === 'object') {
        //             handleLoggedIn(true);
        //             let newAssets: any = [];
        //             searchAssets.map((a: Asset) => {
        //                 newAssets.push({
        //                     id: a.id,
        //                     name: a.name,
        //                     description: a.description
        //                 });
        //             })
        //             setAssets(newAssets);
        //         }
        //     } catch(err) {
        //         console.log(err);
        //     }
        // }

        // if (client) getAssets();
    }, [client]);

    function renderAssets() {
        return (
            <table id='assets'>
                <tr key={0}>
                    <th>ID</th>
                    <th>Asset</th>
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

    async function searchAsset() {

        const searchAssets = await client.assets.search({
            search: {
                query: filters.name
            }
        });
        
        if (searchAssets !== undefined && typeof searchAssets === 'object') {
            let newAssets: any = [];
            searchAssets.map((a: Asset) => {
                newAssets.push({
                    id: a.id,
                    name: a.name,
                    description: a.description
                });
            });
            setAssets(newAssets);
        }
    }

    useEffect(() => {
        if (filters.name) searchAsset();
    }, [filters]);

    useEffect(() => {
        // if (!router.query.id_token) handleLoggedIn(false);
    }, [router, loggedIn]);

    return (
        <>
            <Head>
                <title>Cognite Search</title>
            </Head>

            {
                !router.query.id_token
                    ?
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <button
                                onClick={() => handleLoggedIn(true)}
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'var(--white)',
                                    padding: '10px 20px'
                                }}
                            >Log in</button>
                            
                        </div>
                    :
                        <CogPage>
                            <CogHeaderFull label={'Assets'} icon={'fas fa-box'}>{}</CogHeaderFull>

                            <CogFilter />

                            <CogRoundedContainer>
                                <h2>
                                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                                        <p>{`${assets.length > 0 ? assets.length : 0} Assets`}</p>
                                    </div>
                                </h2>

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
            }
            
        </>
    )
}

export default Home
