// Copyright (C) Siemens AG, 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { ModerationRequestPayload } from '@/object-types'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { Alert, Form, Modal, Spinner } from 'react-bootstrap'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

interface Message {
    type: 'success' | 'danger'
    message: string
}

interface propType {
    [key: string]: string
}

export default function BulkDeclineModerationRequestModal({
    show,
    setShow,
    mrIdNameMap
}: {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    mrIdNameMap: propType
}) {
    const t = useTranslations('default')
    const [deleting] = useState<boolean>(undefined)
    const [hasComment, setHasComment] = useState<boolean>(false)
    const [message, setMessage] = useState<undefined | Message>(undefined)
    const [moderationRequestPayload, setModerationRequestPayload] =
                    useState<ModerationRequestPayload>({
        action: '',
        comment: ''
    })

    const handleCommentValidation = (comment: string) => {
        if (!comment.trim()) {
            return false
        }
        return true
    }

    const handleUserComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedComment = event.target.value;
        setModerationRequestPayload({
            ...moderationRequestPayload,
            [event.target.name]: updatedComment,
        })
        const hasCommentStatus: boolean = handleCommentValidation(updatedComment);
        setHasComment(hasCommentStatus)
    }

    const handleBulkDeclineModerationRequests = async () => {
        await console.log('Test Delete-----', moderationRequestPayload)
    }

    return (
        <>
            <Modal
                size='lg'
                centered
                show={show}
                onHide={() => {
                    if (!deleting) {
                        setShow(false)
                        setMessage(undefined)
                        setHasComment(false)
                    }
                }}
                aria-labelledby={t('Decline All Selected Moderation Requests')}
                scrollable
            >
                <Modal.Header style={{ backgroundColor: '#feefef',
                                       color: '#da1414' }}
                              closeButton>
                    <Modal.Title id='delete-all-license-info-modal'>
                        <AiOutlineQuestionCircle />
                            {t('Decline All Selected Moderation Requests')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && (
                        <Alert variant={message.type} id='declineBulkMR.message.alert'>
                            {message.message}
                        </Alert>
                    )}
                    <p className='my-3'>{t('Decline All MRs')}</p> 
                    <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label className='mb-1'>
                            {t.rich('Your selected Moderation requests are')}
                            <ul>
                                {Object.entries(mrIdNameMap).map(([key, value]) => (
                                    <li key={key}>
                                        <Link className='link'
                                              href={`/requests/moderationRequest/${key}`}>
                                            {`${value}`}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Form.Label>
                        <br />
                        <Form.Label style={{ fontWeight: 'bold' }}>
                            {t('Please provide your comments')}{' '}
                            <span className='text-red' style={{ color: '#F7941E' }}>
                                *
                            </span>
                        </Form.Label>
                        <p className='subscriptionBox'
                            style={{textAlign: 'left'}}>
                            {t('Note for comments')}
                        </p>
                        <Form.Control
                            as='textarea'
                            name='comment'
                            aria-label='With textarea'
                            placeholder='Comment your message...'
                            onChange={handleUserComment}
                            required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className='btn btn-dark'
                        onClick={() => {
                            setShow(false)
                            setMessage(undefined)
                            setHasComment(false)
                        }}
                        disabled={deleting}
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        className='btn btn-danger'
                        onClick={async () => {
                            await handleBulkDeclineModerationRequests()
                        }}
                        disabled={deleting || !hasComment}
                    >
                        {t('Bulk Decline Moderation Requests')}{' '}
                        {deleting && 
                            <Spinner size='sm' className='ms-1 spinner' />
                        }
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
