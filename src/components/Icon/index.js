import preact from 'preact';
import feather from 'feather-icons';

export default class Home extends preact.Component {
    render({ name }) {
        if (name == 'logo') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.706 26.287" width="144.706" height="26.287"><path d="M24.623 24.418c0 .455-.187.84-.559 1.151s-.786.468-1.242.468c-.312 0-.606-.09-.882-.27a1.698 1.698 0 0 1-.63-.773l-2.376-5.4H5.76l-2.376 5.4c-.145.336-.36.594-.648.773s-.588.27-.899.27c-.48 0-.906-.156-1.278-.468S0 24.873 0 24.418c0-.192.06-.433.18-.721L10.332 1.485c.167-.384.438-.684.81-.9s.762-.324 1.17-.324.798.108 1.17.324.642.516.811.9l10.151 22.212c.118.288.179.529.179.721zM7.091 16.642h10.547L12.347 4.726 7.091 16.642zM52.197 24.562c0 .433-.175.798-.522 1.098s-.75.45-1.206.45c-.672 0-1.212-.3-1.62-.9l-4.823-7.488c-.553-.863-1.141-1.469-1.765-1.817-.624-.348-1.439-.521-2.447-.521h-4.068v8.784c0 .575-.162 1.031-.486 1.367-.323.336-.773.504-1.35.504-.553 0-.996-.168-1.332-.504-.337-.336-.504-.792-.504-1.367V2.277c0-.552.162-.99.486-1.314.323-.324.773-.486 1.35-.486h8.963c2.808 0 4.95.624 6.425 1.872 1.477 1.248 2.214 3.072 2.214 5.472 0 1.993-.563 3.606-1.691 4.842-1.129 1.236-2.736 2.022-4.824 2.358a4.284 4.284 0 0 1 1.692.9c.504.432.995 1.031 1.476 1.799l3.708 5.832c.215.313.324.649.324 1.01zm-9.756-12.168c1.872 0 3.258-.366 4.157-1.098.9-.732 1.351-1.866 1.351-3.402s-.444-2.658-1.332-3.366c-.888-.708-2.28-1.062-4.175-1.062H35.71v8.928h6.731zM84.172 25.39c-.324-.312-.486-.731-.486-1.261V2.169c0-.552.167-1.002.504-1.35.336-.348.779-.522 1.332-.522.576 0 1.031.168 1.368.504.336.336.504.792.504 1.368v20.592h10.943c.553 0 .979.132 1.278.396.3.265.45.648.45 1.152s-.15.888-.45 1.151c-.3.265-.726.396-1.278.396H85.485c-.552.001-.99-.155-1.313-.466zM107.464 25.39c-.324-.312-.486-.731-.486-1.261V2.169c0-.552.167-1.002.504-1.35.336-.348.779-.522 1.332-.522.576 0 1.031.168 1.368.504.336.336.504.792.504 1.368v20.592h10.943c.553 0 .979.132 1.278.396.3.265.45.648.45 1.152s-.15.888-.45 1.151c-.3.265-.726.396-1.278.396h-12.852c-.552.001-.99-.155-1.313-.466zM143.014.297c.432 0 .822.174 1.17.522.348.348.522.75.522 1.206 0 .432-.145.804-.433 1.116l-8.496 10.584v10.44c0 .6-.174 1.062-.521 1.385-.349.324-.798.486-1.35.486-.553 0-.997-.162-1.332-.486-.337-.323-.505-.785-.505-1.385v-10.44l-8.495-10.584c-.288-.312-.433-.696-.433-1.152 0-.456.168-.852.504-1.188a1.629 1.629 0 0 1 1.188-.504c.479 0 .899.216 1.26.648l7.848 9.864 7.812-9.864c.337-.432.757-.648 1.261-.648z" /><g><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="67.342" y1="1.72" x2="67.342" y2="26.287"><stop offset="0" stop-color="#43adac" /><stop offset="1" stop-color="#1f9897" /></linearGradient><path fill="url(#a)" d="M67.37 24.557c-.055 0-.105-.01-.158-.014l.131.338.13-.334c-.035.002-.068.01-.103.01z" /><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="67.342" y1="1.766" x2="67.342" y2="26.333"><stop offset="0" stop-color="#b25c87" /><stop offset="1" stop-color="#a23b71" /></linearGradient><path fill="url(#b)" d="M67.37 24.557c-.055 0-.105-.01-.158-.014l.131.338.13-.334c-.035.002-.068.01-.103.01z" /><path fill="none" d="M67.37 24.557c-.055 0-.105-.01-.158-.014l.131.338.13-.334c-.035.002-.068.01-.103.01z" /><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="62.745" y1="1.697" x2="62.745" y2="26.288"><stop offset="0" stop-color="#43adac" /><stop offset="1" stop-color="#1f9897" /></linearGradient><path fill="url(#c)" d="M65.65 23.312l-.007-.004-4.935-12.698.007-.003a7.37 7.37 0 0 1 .71-7.653 7.397 7.397 0 0 0-3.278 6.15c0 1.161.275 2.256.752 3.235l-.008.004 4.937 12.698.008.004a1.81 1.81 0 0 0 1.717 1.242c.8 0 1.475-.52 1.718-1.238l.011-.008.062-.16-.131-.338a1.816 1.816 0 0 1-1.563-1.231z" /><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="71.95" y1="1.743" x2="71.95" y2="26.336"><stop offset="0" stop-color="#b25c87" /><stop offset="1" stop-color="#a23b71" /></linearGradient><path fill="url(#d)" d="M76.558 9.151c0-2.5-1.24-4.709-3.135-6.051a7.369 7.369 0 0 1 .605 7.506l.008.003-4.938 12.699-.012.006a1.81 1.81 0 0 1-1.614 1.232l-.13.334.08.207.008.004a1.813 1.813 0 0 0 1.718 1.244c.801 0 1.476-.521 1.718-1.242l.011-.006 4.935-12.699-.006-.004a7.389 7.389 0 0 0 .752-3.233z" /><path d="M74.78 7.372a7.376 7.376 0 0 0-1.357-4.271 7.401 7.401 0 0 0-6.052-3.138 7.394 7.394 0 0 0-5.945 2.991 7.37 7.37 0 0 0-.71 7.653l-.007.003 4.936 12.699.007.004a1.814 1.814 0 0 0 1.562 1.23c.053.004.104.014.158.014.035 0 .068-.008.103-.01a1.81 1.81 0 0 0 1.614-1.232l.012-.006 4.937-12.699-.008-.003c.475-.98.75-2.074.75-3.235zm-7.447-2.57a2.57 2.57 0 0 1 2.57 2.569c0 1.196-.82 2.201-1.929 2.484a2.554 2.554 0 0 1-1.333-.013 2.57 2.57 0 0 1-1.764-3.225 2.569 2.569 0 0 1 2.456-1.815z" /></g></svg>
            );
        }

        const icon = feather.icons[name].toSvg();

        return (
            <span className="feather-icon" dangerouslySetInnerHTML={{ __html: icon }} />
        );
    }
}