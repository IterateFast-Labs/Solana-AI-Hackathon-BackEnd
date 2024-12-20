'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' :
                                            'id="xs-controllers-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' :
                                        'id="xs-injectables-links-module-AppModule-d3cdaf780488acc606e53786e6e0fb5fcf15ee352bfcac722334b5a48c512f556d5bf557e161953f5ab366e7a19f23748befbb46a31e3a17ce9e14e38fe1f0e2"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' :
                                            'id="xs-controllers-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' :
                                        'id="xs-injectables-links-module-AuthModule-09be7abdb038f2eed559855bb36a02892460ee998347ab7ef31b6aab6b5483c5db293d3d508243774cbbad762f99abadf1f481c9f8d1848992506bd5f591ba70"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-48cb85e4064fcb1d004889e79fd9654c1b0e273b6793b21306bdcaf5dde4f168fb2fa9700c735c10f2a36622ec2d692aee4bd11d9625f311315f2162de7c9592"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-48cb85e4064fcb1d004889e79fd9654c1b0e273b6793b21306bdcaf5dde4f168fb2fa9700c735c10f2a36622ec2d692aee4bd11d9625f311315f2162de7c9592"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-48cb85e4064fcb1d004889e79fd9654c1b0e273b6793b21306bdcaf5dde4f168fb2fa9700c735c10f2a36622ec2d692aee4bd11d9625f311315f2162de7c9592"' :
                                        'id="xs-injectables-links-module-DatabaseModule-48cb85e4064fcb1d004889e79fd9654c1b0e273b6793b21306bdcaf5dde4f168fb2fa9700c735c10f2a36622ec2d692aee4bd11d9625f311315f2162de7c9592"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EasyTestModule.html" data-type="entity-link" >EasyTestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' : 'data-bs-target="#xs-controllers-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' :
                                            'id="xs-controllers-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' }>
                                            <li class="link">
                                                <a href="controllers/EasyTestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EasyTestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' : 'data-bs-target="#xs-injectables-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' :
                                        'id="xs-injectables-links-module-EasyTestModule-02ae6b506f4c83046101c8b22073b5bcfa21360c15e1814562102cd42132df6366cb7c57f8fa3f015584dec91df6f83d225e446c20b8890f4fea42a4a6ac1a52"' }>
                                        <li class="link">
                                            <a href="injectables/EasyTestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EasyTestService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeaderboardModule.html" data-type="entity-link" >LeaderboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' : 'data-bs-target="#xs-controllers-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' :
                                            'id="xs-controllers-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' }>
                                            <li class="link">
                                                <a href="controllers/LeaderboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeaderboardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' : 'data-bs-target="#xs-injectables-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' :
                                        'id="xs-injectables-links-module-LeaderboardModule-c600750507ec1f00d9023322cf9587003a6c7ea91ee99565925357188c3b03aa4334eafdcdf2ffe95be5adeedfd9c158f221690bba3d906229c4c1d8fbbb1193"' }>
                                        <li class="link">
                                            <a href="injectables/LeaderboardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeaderboardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuestModule.html" data-type="entity-link" >QuestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' : 'data-bs-target="#xs-controllers-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' :
                                            'id="xs-controllers-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' }>
                                            <li class="link">
                                                <a href="controllers/QuestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' : 'data-bs-target="#xs-injectables-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' :
                                        'id="xs-injectables-links-module-QuestModule-6b261fb149305e5a43fdaf2f106bd5bcec057603dbf0b91dbf219286854a545ba4b87b388926a282a9ae3ae31840e039a6ce5d2a5734b35cc5ea4868fa2c3ab7"' }>
                                        <li class="link">
                                            <a href="injectables/QuestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-907e47009ac129a7897e3ea6b9fc879cab1796917adb3d3cabb2a5eee4f8ec2a2f3f67cca8078da8331bf07032aacf45cc2a0b7e37b2e5377fbce612d6334772"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-907e47009ac129a7897e3ea6b9fc879cab1796917adb3d3cabb2a5eee4f8ec2a2f3f67cca8078da8331bf07032aacf45cc2a0b7e37b2e5377fbce612d6334772"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-907e47009ac129a7897e3ea6b9fc879cab1796917adb3d3cabb2a5eee4f8ec2a2f3f67cca8078da8331bf07032aacf45cc2a0b7e37b2e5377fbce612d6334772"' :
                                        'id="xs-injectables-links-module-RedisModule-907e47009ac129a7897e3ea6b9fc879cab1796917adb3d3cabb2a5eee4f8ec2a2f3f67cca8078da8331bf07032aacf45cc2a0b7e37b2e5377fbce612d6334772"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' : 'data-bs-target="#xs-controllers-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' :
                                            'id="xs-controllers-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' : 'data-bs-target="#xs-injectables-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' :
                                        'id="xs-injectables-links-module-UserModule-d4b5bea71d7b7e77596d2051b78e391148a832f3ff7ab882230463c1124f19abf6c1d35bf30948701177613de724f79304fd24d7647b1afc61f495a737c0b715"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConnectWalletDto.html" data-type="entity-link" >ConnectWalletDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNonceDto.html" data-type="entity-link" >CreateNonceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetLeaderboardDto.html" data-type="entity-link" >GetLeaderboardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetQuestsDto.html" data-type="entity-link" >GetQuestsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetQuestsFilterDto.html" data-type="entity-link" >GetQuestsFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/I18nException.html" data-type="entity-link" >I18nException</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserProfileDto.html" data-type="entity-link" >PatchUserProfileDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/I18nInterceptor.html" data-type="entity-link" >I18nInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskContent.html" data-type="entity-link" >TaskContent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});