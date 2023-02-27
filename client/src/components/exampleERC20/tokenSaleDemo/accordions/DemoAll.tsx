






export const DemoALl = () => {

    return (<>
        <div className="ratio ratio-16x9">
            <iframe
                src="https://www.youtube.com/embed/DVYMRlp8LI0"
                title="ERC20 Basic Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            >
            </iframe>
        </div>
        <p className="text-start mt-2"><strong>Description:</strong> I used Truffle to compile and deploy my smart contracts to the Ganache network. Then, I added the network to my MetaMask wallet and built a React client that interacts with the contracts using web3.js.</p>
    </>
    );
}