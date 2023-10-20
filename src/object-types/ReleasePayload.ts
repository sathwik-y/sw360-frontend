// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { Attachment, COTSDetails, ClearingInformation, ECCInformation, Repository } from '@/object-types'

export default interface ReleasePayload {
    name?: string
    cpeid?: string
    version?: string
    componentId?: string
    releaseDate?: string
    externalIds?: { [k: string]: string }
    additionalData?: { [k: string]: string }
    clearingState?: string
    createdOn?: string
    createBy?: string
    modifiedBy?: string
    modifiedOn?: string
    mainlineState?: string
    contributors?: Array<string>
    moderators?: Array<string>
    roles?: { [k: string]: Array<string> }
    mainLicenseIds?: Array<string>
    otherLicenseIds?: Array<string>
    vendorId?: string
    languages?: Array<string>
    operatingSystems?: Array<string>
    softwarePlatforms?: Array<string>
    sourceCodeDownloadurl?: string
    binaryDownloadurl?: string
    repository?: Repository
    releaseIdToRelationship?: any
    clearingInformation?: ClearingInformation
    cotsDetails?: COTSDetails
    attachmentDTOs?: Array<Attachment>
    eccInformation?: ECCInformation
}
