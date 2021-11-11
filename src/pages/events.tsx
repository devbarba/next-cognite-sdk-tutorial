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
import moment from 'moment';

const Home: NextPage = () => {
    const { lastPage, currentPagination, handleLastPage, handleCurrentPagination } = useRoot();
    const { client, loggedIn, handleLoggedIn, } = useAuth();
    const { filters } = useFilters();

    const router = useRouter();

    const [events, setEvents] = useState<Asset[]>({} as Asset[]);


    useEffect(() => {
        // async function getAssets() {
        //     try {
        //         const searchEvents = await client.assets?.list().autoPagingToArray({ limit: 10 });

        //         await (await client.assets?.list()).next
        //         if (searchEvents !== undefined && typeof searchEvents === 'object') {
        //             handleLoggedIn(true);
        //             let newEvents: any = [];
        //             searchEvents.map((a: Asset) => {
        //                 newEvents.push({
        //                     id: a.id,
        //                     name: a.name,
        //                     description: a.description
        //                 });
        //             })
        //             setEvents(newEvents);
        //         }
        //     } catch(err) {
        //         console.log(err);
        //     }
        // }

        // if (client) getAssets();
    }, [client]);

    async function searchEvent() {

        const searchEvents = await client.events.search({
            search: {
                description: filters.eventName
            }
        });
        
        if (searchEvents !== undefined && typeof searchEvents === 'object') {
            console.log(searchEvents);
            let newEvents: any = [];
            searchEvents.map((e: any) => {
                newEvents.push({
                    id: e.id,
                    source: e.source,
                    type: e.type,
                    description: e.description,
                    created_at: {
                        date: moment(e.createdTime).format('DD/MM/YYYY'),
                        hour: moment(e.createdTime).format('HH:mm:ss'),
                    },
                });
            })
            setEvents(newEvents);
        }
    }

    useEffect(() => {
        if (filters.eventName) searchEvent();
    }, [filters]);

    useEffect(() => {
        if (!router.query.id_token) handleLoggedIn(false);
    }, [router, loggedIn]);

    return (
        <>
            <Head>
                <title>Cognite Search</title>
            </Head>

            {
                !router.query.id_token && !loggedIn
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
                            <CogHeaderFull label={'Events'} icon={'fas fa-clock'}>{}</CogHeaderFull>

                            <CogFilter />

                            <CogRoundedContainer>
                                <h2>
                                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                                        <p>{`${events.length > 0 ? events.length : 0} Events`}</p>
                                    </div>
                                </h2>

                                <CogTable
                                    lastPage={lastPage}
                                    tableData={{
                                        headers: ['ID', 'Source', 'Type', 'Description', 'Created At'],
                                        asterisc: [4],
                                        data: events,
                                    }}
                                    noneMessage={'No events registered.'}
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
                                        },
                                        {
                                            columnIndex: 3,
                                            type: 'normal',
                                        },
                                        {
                                            columnIndex: 4,
                                            type: 'tippy',
                                            content: 'date',
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
