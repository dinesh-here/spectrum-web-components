/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { css } from 'lit-element';
const styles = css`
:host{display:inline-block;border-radius:var(--spectrum-banner-border-radius,8px);padding:var(--spectrum-banner-padding-y,4px) var(--spectrum-banner-padding-x,8px);font-size:var(--spectrum-banner-text-size,var(--spectrum-global-dimension-size-150));line-height:var(--spectrum-banner-text-line-height,1.3);color:var(--spectrum-banner-text-color,#fff)}#header{font-weight:700}:host([corner]){position:absolute;top:-10px;right:-10px}:host([type=info]){background-color:var(--spectrum-banner-info-background-color,var(--spectrum-global-color-blue-500))}:host([type=warning]){background-color:var(--spectrum-banner-warning-background-color,var(--spectrum-global-color-orange-500))}:host([type=error]){background-color:var(--spectrum-banner-error-background-color,var(--spectrum-global-color-red-500))}
`;
export default styles;