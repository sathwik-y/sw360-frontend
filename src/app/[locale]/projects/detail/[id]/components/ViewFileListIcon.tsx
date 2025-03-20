// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client';

import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { IoMdInformationCircle } from 'react-icons/io'

import type { JSX } from "react";
import { TFunction } from 'i18next'   // ✅ Added proper typing

interface Props {
    license: string
    t: TFunction        // ✅ Correctly typed the translation function
    openModal: (license: string) => void
}

const ViewFileListIcon = ({ license, t, openModal }: Props): JSX.Element => {
    return (
        <OverlayTrigger placement='right-end' overlay={<Tooltip>{t('View file list')}</Tooltip>}>
            <span
                className='d-inline-block'
                onClick={() => openModal(license)}
                role="button"                      // ✅ Added accessibility for better ESLint compliance
                tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        openModal(license)
                    }
                }}
            >
                <IoMdInformationCircle className='cursor' color='gray' size='18' />
            </span>
        </OverlayTrigger>
    )
}

export default ViewFileListIcon
