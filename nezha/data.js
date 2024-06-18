document.addEventListener('DOMContentLoaded', function () {
    const affLinks = {
        //AWS
        2: {
            expiration: new Date('2024-9-30'),
            content: {
                type: 'text',
                value: ''
            }
        },
        //Oracle
        13: {
            // expiration: new Date('2024-12-31'),
            content: {
                type: 'text',
                value: 'Free'
            },
        },
        16: {
            content: {
                type: 'text',
                value: 'Free'
            },
        },
        1: {
            content: {
                type: 'text',
                value: 'Free'
            },
        },
        15: {
            content: {
                type: 'text',
                value: 'Free'
            },
        },
        //Linode
        17: {
            expiration: new Date('2024-09-01'),
            content: {
                type: 'text',
                value: ''
            }
        },
        18: {
            expiration: new Date('2024-09-01'),
            content: {
                type: 'text',
                value: ''
            }
        },
        19: {
            expiration: new Date('2024-09-01'),
            content: {
                type: 'text',
                value: ''
            }
        },
        //DO
        20: {
            expiration: new Date('2024-08-11'),
            content: {
                type: 'text',
                value: ''
            }
        },
        21: {
            expiration: new Date('2024-08-11'),
            content: {
                type: 'text',
                value: ''
            }
        },
        //Vultr
        22: {
            expiration: new Date('2025-06-13'),
            content: {
                type: 'text',
                value: ''
            }
        },
        //Tencent 
        12: {
            expiration: new Date('2024-08-27T22:14:55'),
            content: {
                type: 'text',
                value: ''
            }
        },
        14: {
            expiration: new Date('2025-05-28T23:44:09'),
            content: {
                type: 'text',
                value: ''
            }
        },
        //Aliyun
        11: {
            expiration: new Date('2024-06-22T01:13:00'),
            content: {
                type: 'text',
                value: ''
            }
        },
        //Azure
        4: {
            expiration: new Date('2025-05-17'),
            content: {
                type: 'text',
                value: ''
            }
        },
        5: {
            expiration: new Date('2025-05-17'),
            content: {
                type: 'text',
                value: ''
            }
        },
    };

    const createLink = (linkConfig) => {
        const $link = document.createElement('a');
        $link.href = linkConfig.value;
        $link.textContent = linkConfig.label || linkConfig.value;

        if (linkConfig.icon) {
            const $icon = document.createElement('img');
            $icon.src = linkConfig.icon;
            $icon.alt = linkConfig.iconAlt || '';
            $icon.style.height = '18px';  // 设置图片高度
            $link.appendChild($icon);
        }

        if (linkConfig.text) {
            const $text = document.createElement('span');
            $text.textContent = linkConfig.text;
            $link.appendChild(document.createTextNode(' '));
            $link.appendChild($text);
        }

        return $link;
    };

    const createIcon = (iconConfig) => {
        const $icon = document.createElement('img');
        $icon.src = iconConfig.value;
        $icon.alt = iconConfig.label || 'Icon';
        $icon.style.height = '18px';  // 设置图片高度

        if (iconConfig.text) {
            const $text = document.createElement('span');
            $text.textContent = iconConfig.text;
            $icon.appendChild(document.createTextNode(' '));
            $icon.appendChild($text);
        }

        return $icon;
    };

    const createCountdown = (expirationDate) => {
        const $countdown = document.createElement('div');
        $countdown.textContent = ' ';

        const $countdownTime = document.createElement('span');

        const updateCountdown = () => {
            const now = new Date();
            const diff = expirationDate.getTime() - now.getTime();
            if (diff <= 0) {
                clearInterval(countdownInterval);
                $countdownTime.textContent = 'Expired';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // $countdownTime.textContent = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
            $countdownTime.textContent = `${days} Days `;
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();

        $countdown.appendChild($countdownTime);

        return $countdown;
    };

    const rows = document.querySelectorAll('tr');
    rows.forEach((row, index) => {
        let osCell = row.querySelector('td.node-cell.name.center');
        let downtimeCell = document.createElement('td');
        downtimeCell.classList.add('node-cell', 'downtime', 'center');
        let nodeId = row.id.substring(1);
        let affLink = affLinks[nodeId];
        if (!affLink) {
            affLink = {
                content: {
                    type: 'text',
                    value: 'Always'
                }
            };
        }
        if (osCell && affLink && affLink.content) {
            switch (affLink.content.type) {
                case 'link':
                    let link = createLink(affLink.content);
                    downtimeCell.appendChild(link);
                    break;
                case 'icon':
                    let icon = createIcon(affLink.content);
                    downtimeCell.appendChild(icon);
                    break;
                default:
                    let text = document.createTextNode(affLink.content.value);
                    downtimeCell.appendChild(text);
                    break;
            }

            if (affLink.expiration) {
                let countdown = createCountdown(affLink.expiration);
                downtimeCell.appendChild(countdown);
            }

            osCell.parentNode.insertBefore(downtimeCell, osCell.nextSibling);
        }
    });
});