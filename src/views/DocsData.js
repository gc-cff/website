const docsData = [
  {
    section: "Core Concepts",
    items: [
      {
        title: "Introduction",
        icon: "lucide:play",
        content: "## Overview\nDDRaceNetwork is a cooperative multiplayer game mode built on the Teeworlds engine, emphasizing teamwork, precision, and creativity. Creating cheat clients for DDRaceNetwork involves modifying or extending the game's client to introduce custom functionalities, such as automation, enhanced visuals, or gameplay advantages. This documentation provides a foundation for developers interested in building such clients, focusing on the tools, techniques, and considerations required to get started.\n\n## Requirements\nTo begin developing a cheat client for DDRaceNetwork, ensure you have the following tools and dependencies installed:\n\n- **Visual Studio 2022**: A powerful IDE for developing, debugging, and building the cheat client, especially for Windows-based development. It provides robust support for C++, Rust, and Python, along with CMake integration. Download the Community edition from [visualstudio.microsoft.com](https://visualstudio.microsoft.com/vs/).\n- **Rust**: The primary language for low-level systems programming and performance-critical components. Rust's memory safety and concurrency features make it ideal for modifying game clients. Install the latest stable version via [rustup](https://rustup.rs/).\n- **Python (3.10.6 recommended)**: Used for scripting, automation, and prototyping certain features. Python 3.10.6 is recommended for compatibility with common libraries and tools used in DDRaceNetwork modding. Install it from [python.org](https://www.python.org/downloads/release/python-3106/) or your system's package manager.\n- **CMake**: A build system to manage the compilation of the DDRaceNetwork client and its dependencies. CMake simplifies cross-platform development and is essential for building the Teeworlds-based codebase. Download it from [cmake.org](https://cmake.org/download/).\n\nEnsure your development environment is set up with these tools before proceeding to the setup instructions in the next section.",
      },
      {
        title: "Setup Environment",
        icon: "lucide:box",
        content: "## Cloning and Setting Up the Repository\n\nTo begin developing a cheat client for DDRaceNetwork, you need to set up the development environment by cloning the necessary repositories and configuring the build system. Run the following commands in your terminal or command prompt:\n\n```bash\ngit clone https://github.com/ddnet/ddnet\ncd ddnet\ngit clone https://github.com/ddnet/ddnet-libs\nmkdir build\ncd build\ncmake ..\n```\n\n## Explanation of the Setup Process\n\nThe commands above prepare the DDRaceNetwork (DDNet) source code for development:\n\n1. **Cloning DDNet**: The `git clone https://github.com/ddnet/ddnet` command downloads the DDNet source code, which is built on the Teeworlds engine and contains the core game logic and client code you'll modify for your cheat client.\n2. **Cloning DDNet Libraries**: The `git clone https://github.com/ddnet/ddnet-libs` command fetches the required external libraries for DDNet, such as SDL and FreeType, which are necessary for building the client.\n3. **Creating Build Directory**: The `mkdir build` and `cd build` commands create and navigate into a dedicated build directory to keep generated files separate from the source code.\n4. **Running CMake**: The `cmake ..` command generates the build configuration for your system. CMake processes the `CMakeLists.txt` file in the DDNet root directory to detect dependencies (Rust, Python, CMake, and Visual Studio 2022, as noted in the Introduction) and create build files tailored to your platform.\n\n### What CMake Does\nCMake is a cross-platform build system that automates the configuration and generation of build files. For DDNet, it:\n- Detects installed dependencies (e.g., Rust, Python 3.10.6, and libraries in `ddnet-libs`).\n- Configures the build environment for your operating system and toolchain (e.g., Visual Studio 2022 on Windows).\n- Generates project files, such as a Visual Studio solution file (`DDNet.sln`) located in the `build` directory, which you can open to compile and debug the client.\n\nOn Windows, after running `cmake ..`, the solution file will be located at `build/DDNet.sln`. You can open this file in Visual Studio 2022 to build the DDNet client or modify it for your cheat client.",
      },
    ],
  },
  {
    section: "Simple Features",
    items: [
      {
        title: "Fast Fire",
        icon: "lucide:zap",
        content: "## Overview\nThe \"Fast Fire\" feature enables rapid, automated firing for specific weapons in DDRaceNetwork, bypassing the default firing rate limitations. This is achieved by toggling the fire input at a high frequency when the fire key is held, creating a continuous firing effect for eligible weapons.\n\n## Implementation\nThe following code snippet implements the Fast Fire feature. It should be integrated into the input handling logic within `src/game/client/components/controls.cpp`.\n\n```cpp\nif(g_Config.m_ClFastFire &&\n    (GameClient()->m_Snap.m_pLocalCharacter &&\n    GameClient()->m_Snap.m_pLocalCharacter->m_Weapon != WEAPON_SHOTGUN &&\n    GameClient()->m_Snap.m_pLocalCharacter->m_Weapon != WEAPON_GRENADE &&\n    GameClient()->m_Snap.m_pLocalCharacter->m_Weapon != WEAPON_LASER &&\n    GameClient()->m_Snap.m_pLocalCharacter->m_Weapon != WEAPON_NINJA) &&\n    !(GameClient()->m_aClients[GameClient()->m_Snap.m_LocalClientId].m_Jetpack && GameClient()->m_Snap.m_pLocalCharacter->m_Weapon == WEAPON_GUN) &&\n    m_aInputData[g_Config.m_ClDummy].m_PlayerFlags != PLAYERFLAG_IN_MENU)\n{\n    // Get the key bound to +fire\n    char aFireKey[64] = {0};\n    GameClient()->m_Binds.GetKey(\"+fire\", aFireKey, sizeof(aFireKey));\n    int FireKeyId = Input()->FindKeyByName(aFireKey);\n\n    if(FireKeyId != KEY_UNKNOWN && Input()->KeyIsPressed(FireKeyId))\n    {\n        m_aInputData[g_Config.m_ClDummy].m_Fire ^= 1;\n    }\n}\n```",
      },
      {
        title: "Asset & Zoom Unlocks",
        icon: "lucide:unlock",
        content: "## Overview\nThe \"Asset & Zoom Unlocks\" feature bypasses restrictions imposed by certain DDRaceNetwork game modes (e.g., vanilla modes like DM, CTF, and FNG) that lock player zoom levels and block custom game assets. While zoom unlocking allows the client to adjust the camera's zoom level, the visibility of distant players remains server-sided and cannot be altered client-side. Similarly, enabling custom assets allows the use of DDNet-specific entities, enhancing the visual experience in restricted modes. This feature modifies the game info processing to override these restrictions.\n\n## Implementation\nThe following code snippet should be added to the `CGameClient::GetGameInfo` method in `src/game/client/gameclient.cpp`, just before the `return Info;` line, to enable zoom and asset unlocks.\n\n```cpp\nif(g_Config.m_ClZoomUnlock)\n    Info.m_AllowZoom = true;\nif(g_Config.m_ClAssetUnlock)\n    Info.m_EntitiesDDNet = true;\n```",
      },
      {
        title: "Real Angle Display",
        icon: "lucide:compass",
        content: "## Overview\nThe \"Real Angle Display\" feature modifies the rendering of the local player's aim direction to reflect the actual aim angle sent to the server when using a silent aimbot. Silent aimbots adjust the target coordinates (`m_TargetX` and `m_TargetY`) sent to the server without altering the client's mouse position, causing a visual discrepancy between what the player sees and what others observe. This feature ensures the rendered aim direction matches the silent aimbot's target, making the client's view consistent with the server's perspective.\n\n## Implementation\nThe following code snippet modifies the `CPlayers::GetPlayerTargetAngle` method in `src/game/client/components/players.cpp` to support the Real Angle Display feature. This change affects how the local player's aim angle is calculated during rendering.\n\n```cpp\nif(m_pClient->m_Snap.m_LocalClientId == ClientId && !m_pClient->m_Snap.m_SpecInfo.m_Active && Client()->State() != IClient::STATE_DEMOPLAYBACK)\n{\n    // Use silent/sent aim if enabled\n    if(g_Config.m_ClShowRealAngle)\n    {\n        // Use the silent target (sent to server, not mouse)\n        float tx = m_pClient->m_Controls.m_aInputData[g_Config.m_ClDummy].m_TargetX;\n        float ty = m_pClient->m_Controls.m_aInputData[g_Config.m_ClDummy].m_TargetY;\n        return angle(vec2(tx, ty));\n    }\n\n    // Just use the direct input if it's the local player we are rendering\n    return angle(m_pClient->m_Controls.m_aMousePos[g_Config.m_ClDummy]);\n}\n```",
      },
    ],
  },
//   {
//     section: "Advanced Gameplay Features",
//     items: [
//       {
//         title: "Aimbot",
//         icon: "lucide:crosshair",
//         content: "",
//       },
//     ],
//   },
//   {
//     section: "Building User Interfaces",
//     items: [
//       {
//         title: "Toggles & Buttons",
//         icon: "lucide:toggle-left",
//         content: "",
//       },
//       {
//         title: "Sliders & Inputs",
//         icon: "lucide:sliders",
//         content: "",
//       },
//       {
//         title: "Advanced UI Elements",
//         icon: "lucide:layout-template",
//         content: "",
//       },
//     ],
//   }
];

export default docsData;